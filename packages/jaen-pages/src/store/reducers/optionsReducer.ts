import {createReducer} from '@reduxjs/toolkit'

import * as actions from '../actions/optionsActions'
import {OptionsState} from '../types'

const initialState: OptionsState = {isEditing: false}

const optionsReducer = createReducer(initialState, {
  [actions.setEditing.type]: (state, action) => {
    state.isEditing = action.payload
  }
})

export default optionsReducer
