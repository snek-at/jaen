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

import {ipfsActions} from '../actions'

const initialState: {} = {}

const ipfsReducer = createReducer(initialState, {
  [ipfsActions.add.fulfilled.type]: () => {}
})

export default ipfsReducer
