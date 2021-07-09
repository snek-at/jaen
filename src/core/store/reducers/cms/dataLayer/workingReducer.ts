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
import {WorkingDataLayer} from '~/store/types'

const initialState: WorkingDataLayer = {
  pages: {
    home: {
      details: {
        slug: 'home',
        title: 'Development HomePage',
        typeName: 'HomePage',
        childSlugs: [],
        hiddenChildSlugs: []
      },
      fields: {}
    }
  },
  files: {},
  rootPageSlug: 'home'
}

const workingReducer = createReducer(initialState, {
  [cmsActions.publish.fulfilled.type]: (_state, action) => action.payload,
  [cmsActions.overrideWDL.type]: (_state, action) =>
    action.payload.dataLayer.working
})

export default workingReducer
