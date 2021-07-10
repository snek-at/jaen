/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'
import BridgeDrop from 'drop'
import {PageParamsType, components} from '~/types'

import {encrypt} from '~/common/crypt'
import {isDev} from '~/common/utils'

import {BlockFieldOptions} from '~/components/blocks'

import {ipfsActions} from '.'
import {RootState} from '..'
import {combinedDLSelector} from '../selectors/cms'
import {
  CMSSettings,
  DataLayerFiles,
  EditingDataLayer,
  FileInfo,
  PagesDetails,
  WorkingDataLayer
} from '../types'

export const setSettings = createAction<CMSSettings>('cms/setSettings')

export const registerField = createAction<{
  fieldOptions: BlockFieldOptions
  page: PageParamsType
}>('cms/registerField')
export const unregisterField = createAction<{
  fieldOptions: BlockFieldOptions
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

// export const overrideWDL = createAction<{
//   dataLayer: {working: WorkingDataLayer; editing: EditingDataLayer}
//   checksum: string
// }>('cms/overrideWDL')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const overrideWDL: any = createAsyncThunk<
  {
    dataLayer: {
      working: WorkingDataLayer
      editing: EditingDataLayer
    }
    checksum: string
    key: string | undefined
  },
  {
    workingDataLayer: WorkingDataLayer
    checksum: string
  },
  {}
>('cms/overrideWDL', async ({workingDataLayer, checksum}, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState

    return {
      dataLayer: {
        working: workingDataLayer,
        editing: state.cms.dataLayer.editing
      },
      checksum,
      key: state.auth.secret
    }
  } catch (err) {
    console.error(err)
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const toggleEditing = createAction<boolean>('cms/toggleEditing')
export const discardEditing = createAction('cms/discardEditing')

export const updatePageContent = createAction<{
  content: string
  fieldOptions: BlockFieldOptions
  page: PageParamsType
}>('cms/updatePageContent')

export const setHiddenChildSlugs = createAction<{
  page: PageParamsType
  hiddenChildSlugs: string[]
}>('cms/setHiddenChildSlugs')

export const fetchJaenData = createAsyncThunk<void, void, {}>(
  'cms/fetchJaenData',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState

      const fetchFile = async (url: string): Promise<void> => {
        const res = await fetch(url, {cache: 'no-store'})
        const data: {
          dataLayer: {working: WorkingDataLayer}
        } = await res.json()

        const checksum = state.cms.dataLayer.values.checksum
        const calcChecksum = CryptoJS.SHA256(JSON.stringify(data)).toString(
          CryptoJS.enc.Hex
        )

        if (checksum !== calcChecksum) {
          thunkAPI.dispatch(
            overrideWDL({
              workingDataLayer: data.dataLayer.working,
              checksum: calcChecksum
            })
          )
        }
      }

      // Do not fetch if state.cms.settings.gitRemote is not undefined in dev mode
      // this leads to a onetime load in development and (n) laods in deployment
      if (!(isDev() && state.cms.settings.gitRemote)) {
        fetchFile(`${globalThis.location.origin}/jaen-data.json`)
      }
    } catch (err) {
      console.error(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      const combinedLayer = combinedDLSelector(state)

      // Encrypt some sections of layer
      const clear = {files: combinedLayer.files}
      const cipher = encrypt(clear, state.auth.secret)

      const wokringLayer: WorkingDataLayer = {
        rootPageSlug: combinedLayer.rootPageSlug,
        pages: combinedLayer.pages,
        crypt: {
          cipher
        }
      }

      const publishData = JSON.stringify({
        dataLayer: {working: wokringLayer}
      })

      const {data, errors} =
        await BridgeDrop.buildIn.mutations.doJaenPublishFormPageMutation({
          url: '/jaen-publish',
          // eslint-disable-next-line camelcase
          values: {git_remote: gitRemote, jaen_data: publishData}
        })

      if (!data?.jaenPublishFormPage || errors) {
        throw new Error(`DropAPI publish failed`)
      }

      wokringLayer.crypt.clear = clear

      return wokringLayer
    } catch (err) {
      console.error(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addFile: any = createAsyncThunk<
  {url: string; fileMeta: FileInfo['meta']},
  {file: File; fileMeta: FileInfo['meta']},
  {}
>('cms/addFile', async ({file, fileMeta}, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState

    const {files} = combinedDLSelector(state)

    const {url} = await thunkAPI.dispatch(ipfsActions.add({file})).unwrap()

    return {url, fileMeta, combinedFiles: files}
  } catch (err) {
    console.error(err)
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const removeFile = createAction<string>('cms/removeFile')
export const updateFile = createAction<{
  index: string
  meta: FileInfo['meta']
  combinedFiles: DataLayerFiles
}>('cms/updateFile')
