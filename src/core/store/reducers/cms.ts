/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'
import {union} from 'lodash'
import {PageParamsType} from '~/types'

import {diff} from '~/common/utils'

import {cmsActions} from '../actions'
import {CMSState} from '../types'

const initialState: CMSState = {
  settings: {
    gitRemote: undefined
  },
  options: {
    editing: false
  },
  dataLayer: {
    working: {
      pages: {
        home: {
          details: {
            slug: 'home',
            title: 'Development HomePage',
            typeName: 'HomePage',
            childSlugs: [],
            hiddenChildSlugs: []
          },
          fields: {}
        }
      },
      rootPageSlug: 'home'
    },
    editing: {
      rootPageSlug: 'home',
      pages: {}
    }
  }
}

const cmsReducer = createReducer(initialState, {
  [cmsActions.setSettings.type]: (state, action) => {
    state.settings = action.payload
  },
  [cmsActions.registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    const fields =
      state.dataLayer.editing.pages[page.slug]?.fields?.[fieldOptions.fieldName]

    state.dataLayer.editing.pages[page.slug] = {
      ...state.dataLayer.editing.pages[page.slug],
      fields: {
        ...state.dataLayer.editing.pages[page.slug]?.fields,
        [fieldOptions.fieldName]: {
          ...fields,
          blocks: {
            ...fields?.blocks,
            [fieldOptions.block.position]: {
              ...fields?.blocks?.[fieldOptions.block],
              typeName: fieldOptions.block.typeName
            }
          }
        }
      }
    }
  },
  [cmsActions.unregisterField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    const block = fieldOptions.block

    if (block) {
      delete state.dataLayer.editing.pages[page.slug]?.fields?.[
        fieldOptions.fieldName
      ]?.blocks?.[block.position]
      delete state.dataLayer.working.pages[page.slug]?.fields?.[
        fieldOptions.fieldName
      ]?.blocks?.[block.position]
    } else {
      delete state.dataLayer.editing.pages[page.slug]?.fields?.[
        fieldOptions.fieldName
      ]
      delete state.dataLayer.working.pages[page.slug]?.fields?.[
        fieldOptions.fieldName
      ]
    }
  },
  [cmsActions.registerPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug, title, typeName, isDraft} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug =
      pathParts[pathParts.length - 2] || (rootPageSlug as string)

    state.dataLayer.editing.pages = {
      ...state.dataLayer.editing.pages,
      [slug]: {
        ...state.dataLayer.editing.pages[slug],
        details: diff(
          {
            slug,
            title,
            typeName,
            childSlugs: isDraft ? [] : pagesDetails[slug].childSlugs,
            hiddenChildSlugs: isDraft ? [] : pagesDetails[slug].hiddenChildSlugs
          },
          pagesDetails[slug] || {}
        )
      }
    }

    if (
      !pagesDetails[parentSlug].childSlugs.includes(slug) &&
      parentSlug !== slug
    ) {
      if (state.dataLayer.editing.pages[parentSlug]) {
        state.dataLayer.editing.pages[parentSlug]?.details?.childSlugs?.push(
          slug
        )
      } else {
        state.dataLayer.editing.pages[parentSlug] = {
          ...state.dataLayer.editing.pages[parentSlug],
          details: {
            ...state.dataLayer.editing.pages[parentSlug]?.details,
            childSlugs: pagesDetails[parentSlug].childSlugs.concat([slug])
          }
        }
      }
    }
  },
  [cmsActions.unregisterPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug = pathParts[pathParts.length - 2] || rootPageSlug

    state.dataLayer.editing.pages[slug] = {
      ...state.dataLayer.editing.pages[slug],
      details: {
        ...state.dataLayer.editing.pages[slug]?.details,
        deleted: true
      }
    }

    const setDeleted = (slugs: string[], _parentSlug: string): void => {
      for (const _slug of slugs) {
        state.dataLayer.editing.pages[_slug] = {
          ...state.dataLayer.editing.pages[_slug],
          details: {
            ...state.dataLayer.editing.pages[_slug]?.details,
            deleted: true
          }
        }

        state.dataLayer.editing.pages[_parentSlug] = {
          ...state.dataLayer.editing.pages[_parentSlug],
          details: {
            ...state.dataLayer.editing.pages[_parentSlug]?.details,
            childSlugs: pagesDetails[_parentSlug].childSlugs.filter(
              (e: string) => e !== _slug
            ),
            hiddenChildSlugs: pagesDetails[_parentSlug].hiddenChildSlugs.filter(
              (e: string) => e !== _slug
            )
          }
        }

        setDeleted(pagesDetails[_slug].childSlugs, _slug)
      }
    }

    setDeleted([slug], parentSlug)
  },
  [cmsActions.toggleEditing.type]: (state, action) => {
    state.options.editing = action.payload
  },
  [cmsActions.overrideWDL.type]: (state, action) => {
    const {workingDataLayer, checksum} = action.payload

    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        ...workingDataLayer
      }
    }
    state.dataLayerChecksum = checksum

    // merge editing pages child slugs with new workingLayer pages child slugs
    for (const [slug, page] of Object.entries(state.dataLayer.working.pages)) {
      if (state.dataLayer.editing.pages[slug]) {
        const childSlugs = union(
          state.dataLayer.editing.pages[slug]?.details?.childSlugs,
          page.details?.childSlugs
        )

        const hiddenChildSlugs = union(
          state.dataLayer.editing.pages[slug]?.details?.hiddenChildSlugs,
          page.details?.hiddenChildSlugs
        )

        if (!state.dataLayer.editing.pages[slug]?.details) {
          state.dataLayer.editing.pages[slug].details = {
            childSlugs,
            hiddenChildSlugs
          }
        }

        state.dataLayer.editing.pages[slug].details.childSlugs = childSlugs
        state.dataLayer.editing.pages[slug].details.hiddenChildSlugs =
          hiddenChildSlugs
      }
    }
  },
  [cmsActions.discardEditing.type]: (state, _action) => {
    state.dataLayer.editing = {...state.dataLayer.editing, pages: {}} //initialState.dataLayer.editing
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working
      }
    }
  },
  [cmsActions.updatePageContent.type]: (state, action) => {
    const {
      content,
      fieldOptions,
      page
    }: {
      content: any
      fieldOptions: any
      page: PageParamsType
    } = action.payload

    const {fieldName, block} = fieldOptions

    const workingPageFields =
      state.dataLayer.working.pages[page.slug]?.fields || {}
    const editingPageFields =
      state.dataLayer.editing.pages[page.slug]?.fields || {}

    if (block) {
      const blockContent =
        workingPageFields[fieldName]?.blocks?.[block.position]?.fields?.[
          block.blockFieldName
        ]

      if (blockContent === content) {
        const editingBlocks = editingPageFields[fieldName]?.blocks
        if (editingBlocks) {
          delete editingBlocks[block.position].fields[block.blockFieldName]
        }
        return
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [fieldName]: {
            blocks: {
              ...editingPageFields[fieldName]?.blocks,
              [block.position]: {
                ...editingPageFields[fieldName]?.blocks?.[block.position],
                typeName: block.typeName,
                fields: {
                  ...editingPageFields[fieldName]?.blocks?.[block.position]
                    ?.fields,
                  [block.blockFieldName]: content
                }
              }
            }
          }
        }
      }
    } else {
      if (workingPageFields[fieldName]?.content === content) {
        delete editingPageFields[fieldName]
        return
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [fieldName]: {
            content
          }
        }
      }
    }
  },
  [cmsActions.publish.fulfilled.type]: (state, action) => {
    const workingLayer = action.payload

    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...workingLayer
      },
      editing: {...state.dataLayer.editing, pages: {}}
    }
  },
  [cmsActions.setHiddenChildSlugs.type]: (state, action) => {
    const {page, hiddenChildSlugs} = action.payload

    const slug = page.slug

    state.dataLayer.editing.pages = {
      ...state.dataLayer.editing.pages,
      [slug]: {
        ...state.dataLayer.editing.pages[slug],
        hiddenChildSlugs
      }
    }
  }
})

export default cmsReducer
