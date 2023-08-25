import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {IWidget} from '../../types'

export const widgetInitialState: IWidget = {
  nodes: []
}

const widgetsSlice = createSlice({
  name: 'widget',
  initialState: widgetInitialState,
  reducers: {
    writeData: (
      state,
      action: PayloadAction<{
        widgetName: string
        data: object
      }>
    ) => {
      const {widgetName, data} = action.payload

      // find or create widget object in state
      const widget = state.nodes.find(w => w.name === widgetName)
      if (widget) {
        widget.data = data
      } else {
        state.nodes.push({
          name: widgetName,
          data
        })
      }
    }
  }
})

export const {writeData} = widgetsSlice.actions
export default widgetsSlice.reducer
