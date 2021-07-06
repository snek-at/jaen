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
import {CMSSettings} from '~/store/types'

const initialState: CMSSettings = {
  gitRemote: undefined
}

const settingsReducer = createReducer(initialState, {
  [cmsActions.setSettings.type]: (_state, action) => action.payload
})

export default settingsReducer
