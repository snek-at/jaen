import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Widget} from '../../types'
import {IWidgetState} from '../types'

export const widgetInitialState: IWidgetState = {
  nodes: []
}

const widgetsSlice = createSlice({
  name: 'widget',
  initialState: widgetInitialState,
  reducers: {
    writeData: (
      state,
      action: PayloadAction<
        Partial<Widget> & {
          isCreate?: boolean
        }
      >
    ) => {
      const {id, isCreate, ...data} = action.payload

      if (id) {
        const node = state.nodes.find(node => node.id === id)

        if (node) {
          node.modifiedAt = new Date().toISOString()
          node.data = data.data
        }
      } else {
        if (!data.name) throw new Error('Widget name is required')

        const node: any = {
          ...data,
          modifiedAt: new Date().toISOString()
        }

        // Temporary id, will be replaced by source plugin
        if (!node.id) node.id = Math.random().toString(36).substr(2, 9)

        if (isCreate && !data.createdAt) {
          node.createdAt = new Date().toISOString()
        }

        state.nodes.push(node)
      }
    },
    discardAllChanges: state => {
      state.nodes = []
    }
  }
})

export const {writeData, discardAllChanges} = widgetsSlice.actions
export default widgetsSlice.reducer
