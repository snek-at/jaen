/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'

import {notifyActions} from '../actions'
import {NotifyState} from '../types'

const initialState: NotifyState = {
  error: null
}

const notifyReducer = createReducer(initialState, {
  [notifyActions.setError.type]: (state, action) => {
    const {message, description} = action.payload
    state.error = {message, description}
  },
  [notifyActions.hideError.type]: (state, _action) => {
    state.error = null
  }
})

export default notifyReducer
