/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'

import {FieldOptions} from '../components/types'
import {updatePageContent} from './cmsActions'
import {CMSState} from './types'

const initialState: CMSState = {
  editingMode: true,
  original: {pages: {}},
  edited: {pages: {}}
}

export const cmsReducer = createReducer(initialState, {
  [updatePageContent.type]: (state, action) => {
    console.log(action.payload)
    const {content, fieldOptions}: {content: any; fieldOptions: FieldOptions} =
      action.payload

    console.log('updatePageContent', content, fieldOptions)
    const {page, name, block} = fieldOptions

    const pageFields = state.edited.pages[page.slug]?.fields

    if (block) {
      state.edited.pages[page.slug] = {
        ...state.edited.pages[page.slug],
        fields: {
          ...pageFields,
          [name]: {
            blocks: {
              ...pageFields[name]?.blocks,
              [block.position]: {
                content: content,
                typeName: block.typeName
              }
            }
          }
        }
      }
    } else {
      state.edited.pages[page.slug] = {
        ...state.edited.pages[page.slug],
        fields: {
          ...pageFields,
          [name]: {
            content: content
          }
        }
      }
    }
  }
})
