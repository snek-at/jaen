/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import BridgeDrop from 'drop'
import {PageParamsType, components} from '~/types'

import {RootState} from '..'
import {pagesSelector, rootPageSlugSelector} from '../selectors/cms'
import {CMSSettings, PagesDetails, WorkingDataLayer} from '../types'

export const setSettings = createAction<CMSSettings>('cms/setSettings')

export const registerField = createAction<{
  fieldOptions: any
  page: PageParamsType
}>('cms/registerField')
export const unregisterField = createAction<{
  fieldOptions: any
  page: PageParamsType
}>('cms/unregisterField')

export const registerPage = createAction<{
  page: components.PageNode
  rootPageSlug: string
  pagesDetails: PagesDetails
}>('cms/registerPage')
export const unregisterPage = createAction<{
  page: components.PageNode
  rootPageSlug: string
  pagesDetails: PagesDetails
}>('cms/unregisterPage')

export const overrideWDL =
  createAction<{workingDataLayer: WorkingDataLayer; checksum: string}>(
    'cms/overrideWDL'
  )

export const toggleEditing = createAction<boolean>('cms/toggleEditing')
export const discardEditing = createAction('cms/discardEditing')

export const updatePageContent = createAction<{
  content: string
  fieldOptions: any
  page: PageParamsType
}>('cms/updatePageContent')

export const setHiddenChildSlugs = createAction<{
  page: PageParamsType
  hiddenChildSlugs: string[]
}>('cms/setHiddenChildSlugs')

export const publish: any = createAsyncThunk<WorkingDataLayer, void, {}>(
  'cms/publish',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState

      const {settings} = state.cms

      const {gitRemote} = settings

      if (!gitRemote) {
        throw new Error(
          `DropAPI publish failed. Settings does not include gitRemote`
        )
      }

      const rootPageSlug = rootPageSlugSelector(state)
      const pages = pagesSelector(state)

      const layer = {rootPageSlug, pages: pages}

      const publishData = JSON.stringify({
        dataLayer: {working: layer}
      })

      const {data, errors} =
        await BridgeDrop.buildIn.mutations.doJaenPublishFormPageMutation({
          url: '/jaen-publish',
          values: {git_remote: gitRemote, jaen_data: publishData}
        })

      if (!data?.jaenPublishFormPage || errors) {
        throw new Error(`DropAPI publish failed`)
      }

      return layer
    } catch (err) {
      console.error(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)
