/**
 * @license
 * Copyright snek. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'
import {components, PageParamsType} from '~/types'

import {diff} from '~/common/utils'

import {cmsActions} from '../actions'
import {CMSState, PageIndex} from '../types'

const initialState: CMSState = {
  settings: {
    gitRemote: undefined
  },
  options: {
    editing: false,
    showMenu: false
  },
  dataLayer: {
    working: {updateFieldsCount: 0, pages: {}, index: {pages: {}}},
    editing: {pages: {}, index: {pages: {}}}
  }
}

const cmsReducer = createReducer(initialState, {
  [cmsActions.setSettings.type]: (state, action) => {
    state.settings = action.payload
  },
  [cmsActions.registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload

    console.log(state, fieldOptions, page)

    const fields =
      state.dataLayer.editing.pages[page.slug]?.fields[fieldOptions.fieldName]

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
      delete state.dataLayer.editing.pages[page.slug]?.fields[
        fieldOptions.fieldName
      ]?.blocks?.[block.position]
      delete state.dataLayer.working.pages[page.slug]?.fields[
        fieldOptions.fieldName
      ]?.blocks?.[block.position]
    } else {
      delete state.dataLayer.editing.pages[page.slug]?.fields[
        fieldOptions.fieldName
      ]
      delete state.dataLayer.working.pages[page.slug]?.fields[
        fieldOptions.fieldName
      ]
    }
  },
  [cmsActions.toggleEditing.type]: (state, action) => {
    state.options.editing = action.payload
  },
  [cmsActions.toggleMenu.type]: (state, action) => {
    state.options.showMenu = action.payload
  },
  [cmsActions.overrideWDL.type]: (state, action) => {
    const {data, cksm} = action.payload
    state.dataLayer.origCksm = cksm
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1,
        ...data
      }
    }
  },
  [cmsActions.discardEditing.type]: (state, _action) => {
    state.options.editing = false
    state.dataLayer.editing = initialState.dataLayer.editing
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
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
      fieldOptions: components.EditableFieldOptions
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
        },
        typeName: page.typeName
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
            content: content
          }
        },
        typeName: page.typeName
      }
    }
  },
  [cmsActions.publish.fulfilled.type]: (state, action) => {
    const workingLayer = action.payload

    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...workingLayer,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      },
      editing: initialState.dataLayer.editing
    }
  },
  [cmsActions.setIndex.type]: (state, action) => {
    state.dataLayer.working.index = action.payload
  },
  [cmsActions.transferPageToIndex.type]: (state, action) => {
    const {page, index}: {page: any; index: PageIndex} = action.payload
    const {key, slug, title, typeName, isDraft} = page

    const pathParts = (key as string).split('/').filter(item => item !== '')
    const parentSlug = pathParts[pathParts.length - 2] || index.rootPageSlug

    if (parentSlug) {
      index.pages[parentSlug].childSlugs = index.pages[
        parentSlug
      ].childSlugs.filter(e => e !== slug)
    }

    state.dataLayer.editing.index.pages = {
      ...state.dataLayer.editing.index.pages,
      [slug]: {
        slug,
        title,
        typeName,
        childSlugs: isDraft
          ? []
          : state.dataLayer.editing.index.pages[slug].childSlugs || []
      }
    }

    if (parentSlug) {
      const parentChildSlugs = [...index.pages[parentSlug].childSlugs]
      const identSlugs = slug === parentSlug

      if (!identSlugs) {
        parentChildSlugs.push(slug)

        console.log(
          index.pages[parentSlug],
          {slug, title, typeName},
          diff(index.pages[parentSlug], {slug, title, typeName})
        )

        state.dataLayer.editing.index.pages = {
          ...state.dataLayer.editing.index.pages,
          [parentSlug]: {
            ...diff(index.pages[parentSlug], {slug, title, typeName}),
            childSlugs: parentChildSlugs || []
          }
        }
      }
    }
  },
  [cmsActions.deletePageFromIndex.type]: (state, action) => {
    const {page, index}: {page: any; index: PageIndex} = action.payload
    const {key, slug, isDraft} = page

    let slugs = key.split('/')
    slugs.splice(slugs.length - 2, 1)
    const parentKey = slugs.join('')

    const parentSlug = parentKey === '' ? index.rootPageSlug : parentKey

    if (!isDraft) {
      if (state.dataLayer.editing.index.pages[parentSlug]) {
        state.dataLayer.editing.index.pages[parentSlug].childSlugs =
          index.pages[parentSlug].childSlugs.filter(e => e !== slug)
      }

      if (state.dataLayer.working.index.pages[parentSlug]) {
        state.dataLayer.working.index.pages[parentSlug].childSlugs =
          index.pages[parentSlug].childSlugs.filter(e => e !== slug)
      }

      delete state.dataLayer.working.pages[slug]
      delete state.dataLayer.editing.pages[slug]
      delete state.dataLayer.working.index?.pages[slug]
      delete state.dataLayer.editing.index?.pages[slug]
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
