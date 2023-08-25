import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {IJaenSiteState} from '../types'

export const siteInitialState: IJaenSiteState = {
  siteMetadata: {}
}

const siteSlice = createSlice({
  name: 'site',
  initialState: siteInitialState,
  reducers: {
    updateSiteMetadata: (
      state,
      action: PayloadAction<IJaenSiteState['siteMetadata']>
    ) => {
      state.siteMetadata = {
        ...state.siteMetadata,
        ...action.payload
      }
    },
    discardAllChanges: state => {
      state.siteMetadata = {}
    }
  }
})

export const actions = siteSlice.actions

export default siteSlice.reducer
