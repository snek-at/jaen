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
import {CMSOptions} from '~/store/types'

const initialState: CMSOptions = {
  editing: false
}

const optionsReducer = createReducer(initialState, {
  [cmsActions.toggleEditing.type]: (state, action) => {
    state.editing = action.payload
  }
})

export default optionsReducer
