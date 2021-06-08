/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit'

import {DropAPI, DropAPIReferences} from '../api'
import {FieldOptions} from '../components/types'
// import {RootState} from './store'
import {DataLayer, PageIndex} from './types'

export const registerField = createAction<FieldOptions>('cms/registerField')
export const toggleMenu = createAction<boolean>('cms/toggleMenu')

export const setOverrideWDLState = createAction<boolean>(
  'cms/setOverrideWDLState'
)
export const overrideWDL =
  createAction<{data: DataLayer; cksm: string}>('cms/overrideWDL')

export const toggleEditing = createAction<boolean>('cms/toggleEditing')
export const discardEditing = createAction('cms/discardEditing')

export const updatePageContent = createAction<{
  content: string
  fieldOptions: FieldOptions
}>('cms/updatePageContent')

export const setIndex = createAction<PageIndex>('cms/setIndex')

export const loadPages = createAsyncThunk<
  {},
  undefined,
  {state: {cms: {dataLayer: {working: DataLayer}}}}
>('cms/loadPages', async (_, thunkAPI) => {
  const {working} = thunkAPI.getState().cms.dataLayer
  const pages = JSON.parse(JSON.stringify(working.pages)) as DataLayer['pages']

  try {
    for (const [slug, page] of Object.entries(pages)) {
      const {data, errors} = await DropAPI.queries.doPageQuery({slug})

      if (!data?.page || errors) {
        throw new Error(`DropAPI fetch failed for page with slug <${slug}>`)
      }

      for (const [name, field] of Object.entries(page.fields)) {
        if ((data.page as any)[name]) {
          if (field.blocks) {
            for (const [position, block] of Object.entries(field.blocks)) {
              block.content = (data.page as any)[name][position]?.value
            }
          } else {
            field.content = (data.page as any)[name]
          }
        }
      }
    }

    return pages
  } catch (err) {
    console.error(err)
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const publish = createAsyncThunk<
  {},
  undefined,
  {state: {cms: {dataLayer: {working: DataLayer; editing: DataLayer}}}}
>('cms/publish', async (_, thunkAPI) => {
  const {working, editing} = thunkAPI.getState().cms.dataLayer
  const pages = editing.pages

  try {
    for (const [slug, page] of Object.entries(pages)) {
      const inputFields: {
        [fieldName: string]: string //{type: string; value: string}[]
      } = {}

      for (const [name, field] of Object.entries(page.fields)) {
        if (field.blocks) {
          const inputBlocks: {
            [position: number]: {type: string; value: string}
          } = {}
          const workingBlocks = working.pages[slug]?.fields[name]?.blocks

          for (const [position, block] of Object.entries({
            ...workingBlocks,
            ...field.blocks
          })) {
            inputBlocks[parseInt(position)] = {
              type: block.typeName,
              value: block.content
            }
          }
          inputFields[name] = JSON.stringify(Object.values(inputBlocks))
        } else {
          inputFields[name] = field.content
        }
      }

      console.log(`doUpdate${page.typeName}Mutation`)

      await DropAPIReferences[`doUpdate${page.typeName}Mutation`]({
        slug,
        input: inputFields
      })
    }
  } catch (err) {
    console.error(err)
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})
