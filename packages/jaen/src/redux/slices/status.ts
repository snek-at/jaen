import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {IStatusState} from '../types'

export const statusInitialState: IStatusState = {
  isEditing: false,
  isPublishing: false
}

const statusSlice = createSlice({
  name: 'status',
  initialState: statusInitialState,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload
    },

    setIsPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload
    }
  }
})

export const {setIsEditing, setIsPublishing} = statusSlice.actions
export default statusSlice.reducer
