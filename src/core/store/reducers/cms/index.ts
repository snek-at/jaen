/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {combineReducers} from 'redux'

import dataLayerReducer from './dataLayer'
import optionsReducer from './optionsReducer'
import settingsReducer from './settingsReducer'

const cmsReducer = combineReducers({
  settings: settingsReducer,
  dataLayer: dataLayerReducer,
  options: optionsReducer
})

export default cmsReducer
