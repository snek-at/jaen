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
import gzip from 'gzip-js'
import {PageParamsType, components} from '~/types'

import {encrypt} from '~/common/crypt'
import {blobToFile, isDev} from '~/common/utils'

import {BlockFieldOptions} from '~/components/blocks'

import {ipfsActions} from '.'
import {RootState} from '..'
import {combinedDLSelector} from '../selectors/cms'
import {CMSState} from '../types'
import {
  DataLayerFiles,
  EditingDataLayer,
  FieldUpdateDetails,
  FileInfo,
  PagesDetails,
  WorkingDataLayer
} from '../types/cms/dataLayer'

export const setSettings = createAction<CMSState['settings']>('cms/setSettings')

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
      checksum
    }
  } catch (err) {
    console.error(err)
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export type DecryptWDLPayload = {encryptionToken: string}
export const decryptWDL = createAction<DecryptWDLPayload>('cms/decryptWDL')

export const toggleEditing = createAction<boolean>('cms/toggleEditing')
export const discardEditing = createAction('cms/discardEditing')

export type UpdatePageFieldActionPayload = {
  slug: string
  fieldDetails: FieldUpdateDetails
  workingDataLayer: WorkingDataLayer
}
export const updatePageField = createAction<UpdatePageFieldActionPayload>(
  'cms/updatePageField'
)

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
          await thunkAPI.dispatch(
            overrideWDL({
              workingDataLayer: data.dataLayer.working,
              checksum: calcChecksum
            })
          )

          if (state.auth.authenticated) {
            // get encryption token
            const encryptionToken = state.auth.encryptionToken

            thunkAPI.dispatch(decryptWDL({encryptionToken}))
          }
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

      // Make a object from combinedLayer.files which contains files that refs list is not empty and preserve index
      const usedFiles = Object.keys(combinedLayer.files).reduce(
        (acc: DataLayerFiles, key) => {
          const file = combinedLayer.files[key]
          if (file.refs.length > 0) {
            acc[key] = file
          }
          return acc
        },
        {}
      )

      const clear = {files: combinedLayer.files}
      const cipher = encrypt(clear, state.auth.encryptionToken)

      const workingLayer: WorkingDataLayer = {
        rootPageSlug: combinedLayer.rootPageSlug,
        pages: combinedLayer.pages,
        crypt: {
          cipher,
          clear: {files: usedFiles}
        }
      }

      // Encrypt and gzip dataLayer
      const byteNumbers = gzip.zip(
        encrypt(
          {dataLayer: {working: workingLayer}},
          state.auth.encryptionToken
        ),
        {
          level: 9,
          name: 'jaen-data.json.crypt',
          timestamp: Date.now()
        }
      )

      const blob = new Blob([new Uint8Array(byteNumbers)])

      // Upload blob to ipfs
      const uploaded = await thunkAPI
        .dispatch(
          ipfsActions.add({
            file: blobToFile(blob, 'jaen-data.json.crypt.gz')
          })
        )
        .unwrap()

      // Publish ipfs file url
      const {data, errors} =
        await BridgeDrop.buildIn.mutations.doJaenPublishFormPageMutation({
          url: '/jaen-publish',
          // eslint-disable-next-line camelcase
          values: {git_remote: gitRemote, jaendata_url: uploaded.url}
        })

      if (!data?.jaenPublishFormPage || errors) {
        throw new Error(`DropAPI publish failed`)
      }

      workingLayer.crypt.clear = clear

      return workingLayer
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

export type FileRefActionPayload = {
  /**
   * fielRef:
   *
   * for PlainField: pageSlug + fieldName => home.heading
   * for BlocksField: pageSlug + fieldName + position + blockFieldName => home.timeline.0.title
   */
  fieldRef: string
  fileIndex: string
  workingDataLayer: WorkingDataLayer
}
export const setFileRef = createAction<FileRefActionPayload>('cms/setFileRef')
export const unsetFileRef =
  createAction<FileRefActionPayload>('cms/unsetFileRef')
