/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import md5 from 'crypto-js/md5'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Provider as ReduxProvider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import PageRouter from '~/router'
import {persistor, store} from '~/store'
import {store as storeTypes, components, ConnectedPageType} from '~/types'

import Menu from '~/components/Menu'
import Notify from '~/components/Notify'
import LoginModal from '~/components/modals/Login'

import {login} from '~/store/actions/auth'
import {
  setSettings,
  overrideWDL,
  setIndex,
  toggleMenu
} from '~/store/actions/cms'
import {indexSelector} from '~/store/selectors/cms'

import {CMSContext} from './context'
import {
  IndexKeyRefs,
  ChildPageTypeNamesKeyRefs,
  transformIndexTree
} from './utils'

interface CMSProviderProps {
  settings: storeTypes.CMSSettings
  pages: ConnectedPageType[]
}

const CMSProvider: React.FC<CMSProviderProps> = ({
  settings,
  pages,
  children
}) => {
  const dispatch = useDispatch<storeTypes.AppDispatch>()

  const [registeredPages, setRegisteredPages] =
    useState<ConnectedPageType[]>(pages)

  const getRegisteredPage = (typeName: string) => {
    return registeredPages.find(page => page.PageType === typeName)
  }

  const getChildPageTypeNames = (typeName: string) =>
    getRegisteredPage(typeName)?.ChildPages.map(page => page.PageType)

  const authenticated = useSelector(
    (state: storeTypes.RootState) => state.auth.authenticated
  )

  const index = useSelector(indexSelector)

  console.log('Merged index', index)

  const [treeData, setTreeData] = useState<components.ExplorerTDN[]>()

  const [keyRefs, setKeyRefs] = useState<{
    indexKey: IndexKeyRefs
    childPageTypeNamesKey: ChildPageTypeNamesKeyRefs
  }>()

  useEffect(() => {
    dispatch(setSettings(settings))
  }, [settings])

  useEffect(() => {
    if (index && index.pages && index.rootPageSlug) {
      const {treeData, indexKeyRefs, childPageTypeNamesKeyRefs} =
        transformIndexTree(index, getChildPageTypeNames)

      setTreeData(treeData)
      setKeyRefs({
        indexKey: indexKeyRefs,
        childPageTypeNamesKey: childPageTypeNamesKeyRefs
      })
    }
  }, [index])

  useEffect(() => {
    const fetchFile = async (url: string) => {
      try {
        const data: {
          dataLayer: {working: storeTypes.DataLayer}
          index: storeTypes.PageIndex
        } = await fetch(url, {cache: 'no-store'}).then(res => res.json())

        const layerOrigCksm = store.getState().cms.dataLayer.origCksm
        const cksm = md5(JSON.stringify(data)).toString()

        if (cksm !== layerOrigCksm) {
          dispatch(overrideWDL({data: data.dataLayer.working, cksm}))
          console.log('setindex', setIndex)
          //dispatch(setIndex(data.index))
        }
      } catch {}
    }

    fetchFile(globalThis.location.origin + '/jaen-data.json')

    if (settings.gitRemote) {
      const interval = setInterval(() => {
        fetchFile(
          `https://raw.githubusercontent.com/${settings.gitRemote}/gh-pages/jaen-data.json`
        )
      }, 1000 * 60 * 1)
      return () => clearInterval(interval)
    } else {
      console.warn(
        'Cannot fetch `https://raw.githubusercontent.com/${settings.gitRemote}/gh-pages/jaen-data.json, because gitRemote is undefined'
      )
    }
  }, [])

  useEffect(() => {
    dispatch(login({}))
  }, [])

  return (
    <CMSContext.Provider
      value={{
        index,
        registeredPages,
        treeData,
        keyRefs,
        setRegisteredPages,
        getRegisteredPage
      }}>
      <PageRouter>
        <Notify />
        {authenticated ? <Menu /> : <LoginModal />}
        {children}
      </PageRouter>

      <img
        className="cms-edit"
        style={{maxWidth: 50}}
        src="https://avatars.githubusercontent.com/u/55870326?s=200&v=4"
        title="Edit with snek"
        onClick={() => dispatch(toggleMenu(true))}
      />
    </CMSContext.Provider>
  )
}

const CMSProviderWithRedux: React.FC<CMSProviderProps> = props => {
  return (
    <ReduxProvider store={store}>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistor}>
          <CMSProvider {...props} />
        </PersistGate>
      </React.StrictMode>
    </ReduxProvider>
  )
}

export default CMSProviderWithRedux
