/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'

import {setError, hideError} from './notifyActions'
import {NotifyState} from './types'

const initialState: NotifyState = {
  error: null
}

export const notifyReducer = createReducer(initialState, {
  [setError.type]: (state, action) => {
    const {message, description} = action.payload
    state.error = {message, description}
  },
  [hideError.type]: (state, _action) => {
    state.error = null
  }
})
