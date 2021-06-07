/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'
import merge from 'lodash/merge'

import {FieldOptions} from '~/components/types'

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
  loadIndex
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
    const {name, page, block}: FieldOptions = action.payload

    let pages = state.dataLayer.working.pages

    let blocks = undefined

    if (block) {
      blocks = {
        ...pages[page.slug].fields[name].blocks,
        [block.position]: {
          ...pages[page.slug].fields[name].blocks?.[block.position],
          typeName: block.typeName
        }
      }
    }

    state.dataLayer.working.pages = {
      ...pages,
      [page.slug]: {
        ...pages[page.slug],
        fields: {
          ...pages[page.slug].fields,
          [name]: {
            ...pages[page.slug].fields[name],
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
    const {content, fieldOptions}: {content: any; fieldOptions: FieldOptions} =
      action.payload

    const {page, name, block} = fieldOptions

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
  [loadIndex.fulfilled.type]: (state, action) => {
    const {checksum, tree} = action.payload
    state.index = {checksum, tree}
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
