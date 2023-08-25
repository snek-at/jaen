import {useCallback, useEffect, useState} from 'react'

import {RootState, store} from '../redux/index'
import * as actions from '../redux/slices/status'

export interface ContentManagement {
  isPublishing: boolean
  isEditing: boolean
  toggleIsEditing: () => void
}

export const useContentManagement = (): ContentManagement => {
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const state = store.getState() as RootState

    setIsEditing(state.status.isEditing)

    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState

      setIsEditing(state.status.isEditing)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const toggleIsEditing = useCallback(() => {
    store.dispatch(actions.setIsEditing(!isEditing))
  }, [isEditing])

  return {
    isPublishing: true,
    isEditing,
    toggleIsEditing
  }
}
