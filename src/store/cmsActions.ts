/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit'

import {DropAPI, BridgeSession, DropAPIReferences} from '../api'
import {RootState} from './store'
import {CMSBlock, CMSField} from './types'

export const login = createAsyncThunk(
  'cms/login',
  async (
    args: {
      username: string
      password: string
    },
    thunkAPI
  ) => {
    const {username, password} = args

    try {
      console.log('session begin with', username, password)
      const session = await BridgeSession.begin({username, password})

      console.log(session)

      if (!session) {
        throw new Error('Starting session failed')
      }

      return session
    } catch (err) {
      console.log(err)
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const logout = createAsyncThunk('cms/logout', async (_, thunkAPI) => {
  try {
    const session = await BridgeSession.begin({
      username: 'cisco',
      password: 'ciscocisco'
    })

    if (!session) {
      throw new Error('Resetting session failed')
    }

    return session
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const toggleMenu = createAction<boolean>('cms/toggleMenu')

export const setEditingMode = createAction<boolean>('cms/setEditingMode')

export const loadIndex = createAsyncThunk(
  'cms/loadIndex',
  async (
    args: {
      checksum?: string
    },
    thunkAPI
  ) => {
    const {checksum} = args

    try {
      const {data, errors} = await DropAPI.queries.doPagesIndexTreeQuery({
        checksum: checksum || ''
      })

      if (!data || errors) {
        throw new Error('DropAPI fetch failed')
      }

      return data.pagesIndexTree
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const loadPageContent = createAsyncThunk(
  'cms/loadPageContent',
  async (
    args: {
      id: string
    },
    thunkAPI
  ) => {
    // const {updatePageDropFn, bifrostArgs} = args
    const {id} = args
    try {
      const {data, errors} = await DropAPI.queries.doPageQuery({id})

      if (!data || errors) {
        throw new Error('DropAPI fetch failed')
      }

      return data.page
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const updatePageContent = createAsyncThunk(
  'cms/updatePageContent',
  async (
    args: {
      element: CMSField | CMSBlock
    },
    thunkAPI
  ) => {
    // const {updatePageDropFn, bifrostArgs} = args
    const {element} = args
    try {
      return element
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const publishPageContent = createAsyncThunk<{}, {}, {state: RootState}>(
  'cms/publishPageContent',
  async (_, thunkAPI) => {
    const {pages} = thunkAPI.getState().cms
    try {
      for (const [_key, page] of Object.entries(pages)) {
        const inputBlocks: {
          [fielName: string]: {type: string; value: string}[]
        } = {}

        const inputFields: {
          [fielName: string]: string //{type: string; value: string}[]
        } = {}

        // Convert page blocks to inputBlocks
        if (page.page.blocks) {
          for (const [_, block] of Object.entries(page.page.blocks)) {
            if (!inputBlocks[block.fieldName]) {
              inputBlocks[block.fieldName] = []
            }

            inputBlocks[block.fieldName].push({
              type: block.blockType,
              value: block.content
            })
          }
        }

        // Convert inputBlocks to inputFields
        for (const [key, blocks] of Object.entries(inputBlocks)) {
          inputFields[key] = JSON.stringify(blocks)
        }

        // Convert page fields to inputFields
        if (page.page.fields) {
          for (const [_, field] of Object.entries(page.page.fields)) {
            inputFields[field.fieldName] = field.content
          }
        }

        await DropAPIReferences[`doUpdate${page.name}Mutation`]({
          id: page.id,
          input: inputFields
        })
      }
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)
