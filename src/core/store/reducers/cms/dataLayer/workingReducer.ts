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

import {decrypt} from '~/common/crypt'

import {cmsActions} from '~/store/actions'
import {WorkingDataLayer} from '~/store/types/cms/dataLayer'

const initialState: WorkingDataLayer = {
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
  crypt: {
    cipher: undefined,
    clear: {
      files: {}
    }
  },
  rootPageSlug: 'home'
}

const workingReducer = createReducer(initialState, {
  [cmsActions.publish.fulfilled.type]: (_state, action) => action.payload,
  [cmsActions.overrideWDL.fulfilled.type]: (state, action) => {
    const {dataLayer, key} = action.payload

    if (key) {
      const ciphertext = dataLayer.working.crypt.cipher

      if (ciphertext) {
        state.crypt = {
          clear: decrypt<typeof state.crypt.clear>(ciphertext, key)
        }
      }
    }

    state.rootPageSlug = dataLayer.working.rootPageSlug
    state.pages = dataLayer.working.pages
  }
})

export default workingReducer
