/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {authReducer, cmsReducer, notifyReducer} from './reducers'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'notify']
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    cms: cmsReducer,
    notify: notifyReducer
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {extraArgument: {}},
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([]),
  devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)
export {PersistGate} from 'redux-persist/integration/react'

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState extends ReturnType<typeof store.getState> {}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
