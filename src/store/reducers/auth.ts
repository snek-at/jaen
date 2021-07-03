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

import {authActions} from '../actions'
import {AuthState} from '../types'

const initialState: AuthState = {
  authenticated: false,
  loading: false
}

const authReducer = createReducer(initialState, {
  [authActions.login.pending.type]: (state, _action) => {
    state.loading = true
  },
  [authActions.login.fulfilled.type]: (state, action) => {
    const {anonymous} = action.payload
    if (!anonymous) state.authenticated = true
    state.loading = false
  },
  [authActions.logout.fulfilled.type]: (state, _action) =>
    void (state.authenticated = false)
})

export default authReducer
