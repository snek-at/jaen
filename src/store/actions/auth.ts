/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAsyncThunk} from '@reduxjs/toolkit'
import {BridgeSession} from '~/api'

import {setError} from './notify'

export const login = createAsyncThunk(
  'auth/login',
  async (
    args: {
      creds?: {username: string; password: string}
    },
    thunkAPI
  ) => {
    const {creds} = args

    try {
      const session = await BridgeSession.begin(creds || undefined)

      if (!session) {
        throw new Error('Starting session failed')
      }

      return session
    } catch (err) {
      thunkAPI.dispatch(
        setError({
          message: 'Login failed',
          description: 'You have entered an invalid username or password'
        })
      )
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    if (!(await BridgeSession.end())) {
      throw new Error('Resetting session failed')
    }

    const session = BridgeSession.begin()

    return session
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
