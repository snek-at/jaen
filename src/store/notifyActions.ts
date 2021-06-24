import {createAction} from '@reduxjs/toolkit'

export const setError =
  createAction<{message: string; description: string}>('error/setError')
export const hideError = createAction('error/hideError')
