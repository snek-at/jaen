import deepmerge from 'deepmerge'
import React, {createContext, useContext, useEffect} from 'react'

import {useAppSelector, withRedux} from '../redux'
import {Widget} from '../types'
import {deepmergeArrayIdMerge} from '../utils/deepmerge'

// Define the type for your site metadata

// Create a context with initial data
const WidgetContext = createContext<Array<Widget> | undefined>(undefined)

export interface WidgetProviderProps {
  widgets: Array<Widget>
  children: React.ReactNode
}

// Create the provider component
export const WidgetProvider: React.FC<WidgetProviderProps> = withRedux(
  ({children, widgets}) => {
    const dynamicData = useAppSelector(state => state.widget.nodes)

    const [mergedData, setMergedData] = React.useState<Array<Widget>>(widgets)

    useEffect(() => {
      const merged = deepmerge(widgets, dynamicData || [], {
        arrayMerge: deepmergeArrayIdMerge
      })

      setMergedData(merged)
    }, [widgets, dynamicData])

    return (
      <WidgetContext.Provider value={mergedData}>
        {children}
      </WidgetContext.Provider>
    )
  }
)

// Create a custom hook to use the context
export function useWidgetContext() {
  const context = useContext(WidgetContext)
  if (context === undefined) {
    throw new Error('useWidgetContext must be used within a WidgetProvider')
  }
  return context
}
