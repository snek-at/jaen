/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
  useStore
} from 'react-redux'

import {loadState, saveState} from './localStorage'
import optionsReducer from './reducers/optionsReducer'
import sfReducer from './reducers/sfReducer'
import siteReducer from './reducers/siteReducer'

const combinedReducer = combineReducers({
  options: optionsReducer,
  sf: sfReducer,
  site: siteReducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STATE') {
    state = undefined
  }

  return combinedReducer(state, action)
}

const persistedState = loadState()

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {extraArgument: {}}
    }).concat([]),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: persistedState
})

store.subscribe(() => {
  saveState(store.getState())
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppState = () => useStore().getState() as RootState
