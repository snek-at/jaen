import {useMemo} from 'react'

import {useWidgetContext} from '../contexts/widget'
import {useAppDispatch} from '../redux'
import {Widget} from '../types'
import * as widgetActions from '../redux/slices/widget'

export type UseWidgetReturn<T> = [Widget<T>, (data: T) => void]

export const useWidget = <T extends {}>(
  name: string,
  options?: {
    defaultData?: T
  }
): UseWidgetReturn<T> => {
  const widgets = useWidgetContext()

  const dispatch = useAppDispatch()

  const widget = widgets.find(widget => widget.name === name) as
    | Widget<T>
    | undefined

  const updateWidget = (data: T) => {
    const isCreate = !widget

    dispatch(
      widgetActions.writeData({
        ...widget,
        name,
        data,
        isCreate
      })
    )
  }

  const defaulWidget = useMemo(() => {
    const defaultWidget: Widget<T> = {
      id: 'default',
      name,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      data: options?.defaultData
    }

    return defaultWidget
  }, [name, options?.defaultData])

  return [widget || defaulWidget, updateWidget]
}
