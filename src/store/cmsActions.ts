/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction} from '@reduxjs/toolkit'

// import {DropAPI, BridgeSession, DropAPIReferences} from '../api'
// import {RootState} from './store'
import {FieldOptions} from '../components/types'

export const updatePageContent = createAction<{
  content: string
  fieldOptions: FieldOptions
}>('cms/updatePageContent')
