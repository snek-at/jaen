/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'
import merge from 'lodash/merge'
import {components, PageParamsType} from '~/types'

import {setHiddenChildSlugs} from '~/store/cmsActions'

// import {PageNode} from '../components/Explorer/index'
import {
  registerField,
  toggleMenu,
  toggleEditing,
  discardEditing,
  loadPages,
  publish,
  overrideWDL,
  setOverrideWDLState,
  updatePageContent,
  setIndex,
  transferPageToIndex,
  deletePageFromIndex
} from './cmsActions'
import {CMSState} from './types'

const initialState: CMSState = {
  options: {
    editing: true,
    showMenu: false,
    shouldOverrideWDL: false
  },
  dataLayer: {working: {updateFieldsCount: 0, pages: {}}, editing: {pages: {}}}
}

export const cmsReducer = createReducer(initialState, {
  [registerField.type]: (state, action) => {
    const {fieldOptions, page} = action.payload
    const {name, block}: components.FieldOptions = fieldOptions

    let pages = state.dataLayer.working.pages

    let blocks = undefined

    if (block) {
      blocks = {
        ...pages[page.slug]?.fields[name].blocks,
        [block.position]: {
          ...pages[page.slug]?.fields[name].blocks?.[block.position],
          typeName: block.typeName
        }
      }
    }

    state.dataLayer.working.pages = {
      ...pages,
      [page.slug]: {
        ...pages[page.slug],
        fields: {
          ...pages[page.slug]?.fields,
          [name]: {
            ...pages[page.slug]?.fields[name],
            blocks
          }
        }
      }
    }
  },
  [toggleEditing.type]: (state, action) => {
    state.options.editing = action.payload
  },
  [toggleMenu.type]: (state, action) => {
    state.options.showMenu = action.payload
  },
  [setOverrideWDLState.type]: (state, action) => {
    state.options.shouldOverrideWDL = action.payload
  },
  [overrideWDL.type]: (state, action) => {
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
    state.options.shouldOverrideWDL = false
  },
  [discardEditing.type]: (state, _action) => {
    state.options.editing = false
    state.dataLayer.editing = {pages: {}}
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...state.dataLayer.working,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      }
    }
  },
  [updatePageContent.type]: (state, action) => {
    const {
      content,
      fieldOptions,
      page
    }: {
      content: any
      fieldOptions: components.FieldOptions
      page: PageParamsType
    } = action.payload

    const {name, block} = fieldOptions

    const workingPageFields =
      state.dataLayer.working.pages[page.slug]?.fields || {}
    const editingPageFields =
      state.dataLayer.editing.pages[page.slug]?.fields || {}

    if (block) {
      const blocks = workingPageFields[name]?.blocks

      if (blocks) {
        if (blocks[block.position]?.content === content) {
          const editingBlocks = editingPageFields[name]?.blocks
          if (editingBlocks) {
            delete editingBlocks[block.position]
          }
          return
        }
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [name]: {
            blocks: {
              ...editingPageFields[name]?.blocks,
              [block.position]: {
                content: content,
                typeName: block.typeName
              }
            }
          }
        },
        typeName: page.typeName
      }
    } else {
      if (workingPageFields[name]?.content === content) {
        delete editingPageFields[name]
        return
      }

      state.dataLayer.editing.pages[page.slug] = {
        ...state.dataLayer.editing.pages[page.slug],
        fields: {
          ...editingPageFields,
          [name]: {
            content: content
          }
        },
        typeName: page.typeName
      }
    }
  },
  [publish.fulfilled.type]: (state, _action) => {
    state.dataLayer = {
      ...state.dataLayer,
      working: {
        ...merge(state.dataLayer.working, state.dataLayer.editing),
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      },
      editing: {
        pages: {}
      }
    }
  },
  [setIndex.type]: (state, action) => {
    state.index = action.payload
  },
  [transferPageToIndex.type]: (state, action) => {
    const {key, slug, title, typeName, isDraft} = action.payload

    if (state.index) {
      const pathParts = (key as string).split('/').filter(item => item !== '')
      const parentSlug =
        pathParts[pathParts.length - 2] || state.index.rootPageSlug

      let childSlugs: string[] = []
      if (!isDraft) {
        const slugs = key.split('/')
        const oldSlug = slugs[slugs.length - 2]

        childSlugs = state.index.pages[oldSlug].childSlugs

        delete state.index.pages[oldSlug]
        state.index.pages[parentSlug].childSlugs = state.index.pages[
          parentSlug
        ].childSlugs.filter(e => e !== oldSlug)
      }

      state.index.pages = {
        ...state.index.pages,
        [slug]: {
          slug,
          title,
          typeName,
          childSlugs: isDraft ? [] : childSlugs
        },
        [parentSlug]: {
          ...state.index.pages[parentSlug],
          childSlugs: [...state.index.pages[parentSlug].childSlugs, slug]
        }
      }
    }
  },
  [deletePageFromIndex.type]: (state, action) => {
    const {key, slug, isDraft} = action.payload

    let slugs = key.split('/')
    slugs.splice(slugs.length - 2, 1)
    const parentKey = slugs.join('')

    if (state.index) {
      const parentSlug = parentKey === '' ? state.index.rootPageSlug : parentKey

      if (!isDraft) {
        delete state.dataLayer.working.pages[slug]
        delete state.dataLayer.editing.pages[slug]
        delete state.index.pages[slug]

        state.index.pages[parentSlug].childSlugs = state.index.pages[
          parentSlug
        ].childSlugs.filter(e => e !== slug)
      }
    }
  },
  [setHiddenChildSlugs.type]: (state, action) => {
    const {page, hiddenChildSlugs} = action.payload

    const slug = page.slug

    state.dataLayer.editing.pages = {
      ...state.dataLayer.editing.pages,
      [slug]: {
        ...state.dataLayer.editing.pages[slug],
        hiddenChildSlugs
      }
    }
  },
  [loadPages.fulfilled.type]: (state, action) => {
    const pages = action.payload

    state.dataLayer = {
      ...state.dataLayer,
      editing: {
        pages: {}
      },
      working: {
        ...state.dataLayer.working,
        pages,
        updateFieldsCount: state.dataLayer.working.updateFieldsCount + 1
      }
    }
  }
})
