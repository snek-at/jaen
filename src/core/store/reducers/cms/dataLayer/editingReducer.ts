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

import {diff, getNextIndexedObjectKey} from '~/common/utils'

import {cmsActions} from '~/store/actions'
import {CMSState, EditingDataLayer} from '~/store/types'

const initialState: EditingDataLayer = {
  rootPageSlug: 'home',
  pages: {},
  files: {}
}

const editingReducer = createReducer(initialState, {
  [cmsActions.registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    const fields = state.pages[page.slug]?.fields?.[fieldOptions.fieldName]

    state.pages[page.slug] = {
      ...state.pages[page.slug],
      fields: {
        ...state.pages[page.slug]?.fields,
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
      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages[page.slug],
          fields: {
            ...state.pages[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...state.pages[page.slug]?.fields[fieldOptions.fieldName],
              blocks: {
                ...state.pages[page.slug]?.fields[fieldOptions.fieldName]
                  ?.blocks,
                [block.position]: {
                  ...state.pages[page.slug]?.fields[fieldOptions.fieldName]
                    ?.blocks?.[block.position],
                  deleted: true
                }
              }
            }
          }
        }
      }
    } else {
      state.pages = {
        ...state.pages,
        [page.slug]: {
          ...state.pages[page.slug],
          fields: {
            ...state.pages[page.slug]?.fields,
            [fieldOptions.fieldName]: {
              ...state.pages[page.slug]?.fields[fieldOptions.fieldName],
              deleted: true
            }
          }
        }
      }
    }
  },

  [cmsActions.registerPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug, title, typeName, isDraft} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug =
      pathParts[pathParts.length - 2] || (rootPageSlug as string)

    state.pages = {
      ...state.pages,
      [slug]: {
        ...state.pages[slug],
        details: {
          ...state.pages[slug]?.details,
          ...diff(
            {
              slug,
              title,
              typeName,
              childSlugs: isDraft ? [] : pagesDetails[slug].childSlugs,
              hiddenChildSlugs: isDraft
                ? []
                : pagesDetails[slug].hiddenChildSlugs
            },
            pagesDetails[slug] || {}
          ),
          deleted: undefined
        }
      }
    }

    if (
      !pagesDetails[parentSlug].childSlugs.includes(slug) &&
      parentSlug !== slug
    ) {
      state.pages[parentSlug] = {
        ...state.pages[parentSlug],
        details: {
          ...state.pages[parentSlug]?.details,
          childSlugs: pagesDetails[parentSlug].childSlugs.concat([slug]) || []
        }
      }
    }
  },
  [cmsActions.unregisterPage.type]: (state, action) => {
    const {page, rootPageSlug, pagesDetails} = action.payload

    const {key, slug} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug = pathParts[pathParts.length - 2] || rootPageSlug

    state.pages[slug] = {
      ...state.pages[slug],
      details: {
        ...state.pages[slug]?.details,
        deleted: true
      }
    }

    const setDeleted = (slugs: string[], _parentSlug: string): void => {
      for (const _slug of slugs) {
        state.pages[_slug] = {
          ...state.pages[_slug],
          details: {
            ...state.pages[_slug]?.details,
            deleted: true
          }
        }

        state.pages[_parentSlug] = {
          ...state.pages[_parentSlug],
          details: {
            ...state.pages[_parentSlug]?.details,
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

  [cmsActions.updatePageContent.type]: (state, action) => {
    const {content, fieldOptions, page, workingDataLayer} = action.payload

    const {fieldName, block} = fieldOptions

    const workingPageFields = workingDataLayer.pages[page.slug]?.fields || {}
    const editingPageFields = state.pages[page.slug]?.fields || {}

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

      state.pages[page.slug] = {
        ...state.pages[page.slug],
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

      state.pages[page.slug] = {
        ...state.pages[page.slug],
        fields: {
          ...editingPageFields,
          [fieldName]: {
            content
          }
        }
      }
    }
  },

  [cmsActions.setHiddenChildSlugs.type]: (state, action) => {
    const {page, hiddenChildSlugs} = action.payload

    const slug = page.slug

    state.pages = {
      ...state.pages,
      [slug]: {
        ...state.pages[slug],
        hiddenChildSlugs
      }
    }
  },

  [cmsActions.publish.fulfilled.type]: (_state, _action) => initialState,
  [cmsActions.discardEditing.type]: (_state, _action) => initialState,

  [cmsActions.overrideWDL.fulfilled.type]: (state, action) => {
    const {dataLayer} = action.payload

    const {working, editing} = dataLayer as CMSState['dataLayer']

    // merge editing pages child slugs with new workingLayer pages child slugs
    for (const [slug, page] of Object.entries(working.pages)) {
      if (editing.pages[slug]) {
        const childSlugs = union(
          state.pages[slug]?.details?.childSlugs,
          page.details?.childSlugs
        )

        const hiddenChildSlugs = union(
          state.pages[slug]?.details?.hiddenChildSlugs,
          page.details?.hiddenChildSlugs
        )

        if (!state.pages[slug]?.details) {
          state.pages[slug].details = {
            childSlugs,
            hiddenChildSlugs
          }
        }

        state.pages[slug].details.childSlugs = childSlugs
        state.pages[slug].details.hiddenChildSlugs = hiddenChildSlugs
      }
    }
  },

  [cmsActions.addFile.fulfilled.type]: (state, action) => {
    const {url, fileMeta, combinedFiles} = action.payload

    state.files[getNextIndexedObjectKey(combinedFiles)] = {url, meta: fileMeta}
  },
  [cmsActions.removeFile.type]: (state, action) => {
    const index = action.payload

    state.files = {
      ...state.files,
      [index]: {
        ...state.files[index],
        meta: {
          ...state.files[index]?.meta,
          deleted: true
        }
      }
    }
  },
  [cmsActions.updateFile.type]: (state, action) => {
    const {index, meta, combinedFiles} = action.payload

    state.files = {
      ...state.files,
      [index]: {
        ...state.files[index],
        meta: {
          ...state.files[index]?.meta,
          ...diff(meta, combinedFiles[index]?.meta)
        }
      }
    }
  }
})

export default editingReducer
