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

import {cmsActions} from '~/store/actions'
import {ValuesDataLayer} from '~/store/types'

const initialState: ValuesDataLayer = {
  forceUpdateTrigger: 0
}

const valuesReducer = createReducer(initialState, {
  [cmsActions.overrideWDL.type]: (state, action) => {
    const {checksum} = action.payload

    state.checksum = checksum
  },

  [cmsActions.registerField.type]: (state, _action) => {
    state.forceUpdateTrigger += 1
  },
  [cmsActions.unregisterField.type]: (state, _action) => {
    state.forceUpdateTrigger += 1
  },
  [cmsActions.discardEditing.type]: (state, _action) => {
    state.forceUpdateTrigger += 1
  }
})

export default valuesReducer
