/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'

import {
  setEditingMode,
  loadPageContent,
  publishPageContent,
  updatePageContent,
  loadIndex,
  toggleMenu,
  login
} from './cmsActions'
import {CMSState} from './types'

const initialState: CMSState = {
  authenticated: false,
  editingMode: false,
  showMenu: false,
  menu: {},
  pages: {}
}

export const cmsReducer = createReducer(initialState, {
  [login.fulfilled.type]: (state, _action) => void (state.authenticated = true),
  [toggleMenu.type]: (state, action) => void (state.showMenu = action.payload),
  [setEditingMode.type]: (state, action) =>
    void (state.editingMode = action.payload),
  [loadIndex.fulfilled.type]: (state, action) => {
    const {checksum, tree} = action.payload
    state.menu.index = {checksum, tree}
  },
  [loadPageContent.fulfilled.toString()]: (state, action) => {
    const page = action.payload
    const CMSPageId = `${page.id}_${page.__typename}`

    if (!state.pages[CMSPageId]) {
      state.pages[CMSPageId] = {
        ...state.pages[CMSPageId],
        serverContent: page
      }
    } else {
      state.pages[CMSPageId].serverContent = page
    }
  },
  [updatePageContent.fulfilled.toString()]: (state, action) => {
    const element = action.payload
    const CMSPageId = `${element.pageId}_${element.pageName}`

    if (element.type === 'FIELD') {
      const CMSId = `${element.pageId}_${element.fieldName}`
      state.pages[CMSPageId] = {
        ...state.pages[CMSPageId],
        id: element.pageId,
        name: element.pageName,
        page: {
          ...state.pages[CMSPageId]?.page,
          fields: {
            ...state.pages[CMSPageId]?.page.fields,
            [CMSId]: element
          }
        }
      }
    } else if (element.type === 'BLOCK') {
      const CMSId = `${element.pageId}_${element.fieldName}_${element.blockType}_${element.blockId}`
      state.pages[CMSPageId] = {
        ...state.pages[CMSPageId],
        id: element.pageId,
        name: element.pageName,
        page: {
          ...state.pages[CMSPageId]?.page,
          blocks: {
            ...state.pages[CMSPageId]?.page.blocks,
            [CMSId]: element
          }
        }
      }
    }
  },
  [publishPageContent.fulfilled.toString()]: (state, _action) =>
    void (state.editingMode = false)
})
