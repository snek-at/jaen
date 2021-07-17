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
import BridgeDrop from 'drop'
import {jaenAccountTypeFields_myJaenAccountQuery as MyJaenAccountPayload} from 'drop/lib/types.gen'
import {BridgeSession} from '~/api'

import {setError} from './notify'

export type {MyJaenAccountPayload}

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

      await thunkAPI.dispatch(fetchMyJaenAccount())

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

// fetch myJaenAccount using the BridgeDrop.buildIn.queries.doMyJaenAccountQuery (requires a logged in user)
export const fetchMyJaenAccount = createAsyncThunk<
  MyJaenAccountPayload,
  void,
  {}
>('auth/fetchMyJaenAccount', async (_, thunkAPI) => {
  try {
    const res = await BridgeDrop.buildIn.queries.doMyJaenAccountQuery({})

    if (res.errors) {
      throw new Error(JSON.stringify(res.errors))
    }

    if (res.data?.myJaenAccount) {
      return res.data.myJaenAccount as MyJaenAccountPayload
    } else {
      throw new Error(
        'Fetching result data or myJaenAccount is null or undefined'
      )
    }
  } catch (err) {
    thunkAPI.dispatch(
      setError({
        message: 'Fetching myJaenAccount failed',
        description: err.response.data
      })
    )
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
