/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import 'antd/dist/antd.css'
import md5 from 'crypto-js/md5'
import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {Provider, useDispatch, useSelector} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import Menu from '~/components/Menu'

import {overrideWDL, setIndex, toggleMenu} from '~/store/cmsActions'
import {AppDispatch, persistor, RootState, store} from '~/store/store'
import {DataLayer, PageIndex} from '~/store/types'

import {switchBridge} from './api'
import './cms.scss'
import {TextField} from './components/fields'
import {PageProvider, ConnectedPageType} from './components/pages/index'
import {CMSContext} from './context'
import PageRouter from './router'

interface CMSProviderProps {
  bifrostUrls: {httpUrl: string; wssUrl?: string}
  pages: ConnectedPageType[]
}

export const CMSProvider: React.FC<CMSProviderProps> = ({
  bifrostUrls,
  pages,
  children
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const [registeredPages, setRegisteredPages] =
    useState<ConnectedPageType[]>(pages)

  const getRegisteredPage = (typeName: string) => {
    return registeredPages.find(page => page.PageType === typeName)
  }

  const index = useSelector(
    (state: RootState) => state.cms.index || ({} as PageIndex)
  )
  const layerOrigCksm = useSelector(
    ({cms}: RootState) => cms.dataLayer.origCksm
  )
  const shouldOverrideWDL = useSelector(
    ({cms}: RootState) => cms.options.shouldOverrideWDL
  )

  useEffect(() => {
    fetch(globalThis.location.origin + '/jaen-data.json').then(res =>
      res
        .json()
        .then((data: {dataLayer: {origin: DataLayer}; index: PageIndex}) => {
          const cksm = md5(JSON.stringify(data)).toString()

          if (cksm !== layerOrigCksm || shouldOverrideWDL) {
            dispatch(overrideWDL({data: data.dataLayer.origin, cksm}))
            dispatch(setIndex(data.index))
          }
        })
    )
  })

  switchBridge(bifrostUrls)

  return (
    <CMSContext.Provider
      value={{index, registeredPages, setRegisteredPages, getRegisteredPage}}>
      <PageRouter>
        <Menu />
        {children}
      </PageRouter>

      <img
        className="btn btn-dark btn-lg btn-floating cms-edit"
        src="https:avatars.githubusercontent.com/u/55870326?s=200&v=4"
        data-mdb-toggle="popover"
        title="Edit with snek"
        onClick={() => dispatch(toggleMenu(true))}
      />
    </CMSContext.Provider>
  )
}

const HomePage: ConnectedPageType = ({slug}) => {
  return (
    <>
      <PageProvider typeName={HomePage.PageType} slug={slug}>
        <TextField fieldOptions={{name: 'testfield'}} />
      </PageProvider>
    </>
  )
}

HomePage.PageType = 'HomePage'
HomePage.ChildPages = [HomePage]

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <CMSProvider
          bifrostUrls={{
            httpUrl: 'http://localhost:8000/graphql'
          }}
          pages={[HomePage]}
        />
      </PersistGate>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
)
