/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAsyncThunk} from '@reduxjs/toolkit'
import {BifrostBridge} from '@snek-at/bridge'

const Bridge = new BifrostBridge({
  httpUrl: 'https://origin.snek.at/graphql'
})

export const login = createAsyncThunk(
  'auth/login',
  async (
    args: {
      creds?: {username: string; password: string}
      isGuest?: boolean
    },
    thunkAPI
  ) => {
    const {creds, isGuest} = args

    try {
      const session = await Bridge.session.begin(creds || undefined)

      if (!session) {
        throw new Error('Starting session failed')
      }

      return {session, isGuest}
    } catch (err: any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    if (!(await Bridge.session.end())) {
      throw new Error('Resetting session failed')
    }

    const session = Bridge.session.begin()

    return session
  } catch (err: any) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
