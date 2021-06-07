/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createReducer} from '@reduxjs/toolkit'

import {login, logout} from './authActions'
import {AuthState} from './types'

const initialState: AuthState = {
  authenticated: false
}

export const authReducer = createReducer(initialState, {
  [login.fulfilled.type]: (state, action) => {
    const {anonymous} = action.payload
    if (!anonymous) state.authenticated = true
  },
  [logout.fulfilled.type]: (state, _action) =>
    void (state.authenticated = false)
})
