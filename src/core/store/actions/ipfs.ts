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
import {ipfs} from '~/api'

export const add = createAsyncThunk<{url: string}, {file: File}, {}>(
  'ipfs/add',
  async ({file}, thunkAPI) => {
    try {
      const result = await ipfs.add({path: file.name, content: file.stream()})

      return {url: `https://ipfs.io/ipfs/${result.cid.toString()}`}
    } catch (err) {
      console.error(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)
