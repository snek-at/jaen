/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer, PayloadAction} from '@reduxjs/toolkit'

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
  [cmsActions.overrideWDL.fulfilled.type]: (_state, action) =>
    action.payload.dataLayer.working,
  [cmsActions.decryptWDL.type]: (
    state,
    action: PayloadAction<cmsActions.DecryptWDLPayload>
  ) => {
    const {encryptionToken} = action.payload

    if (encryptionToken) {
      const ciphertext = state.crypt.cipher

      if (ciphertext) {
        state.crypt = {
          clear: decrypt<typeof state.crypt.clear>(ciphertext, encryptionToken)
        }
      }
    }
  }
})

export default workingReducer
