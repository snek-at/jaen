/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import md5 from 'crypto-js/md5'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector, useStore} from 'react-redux'
import PageRouter from '~/router'
import {store, components, ConnectedPageType} from '~/types'

import Menu from '~/components/Menu'
import Notify from '~/components/Notify'
import LoginModal from '~/components/modals/Login'

import {
  setSettings,
  overrideWDL,
  setIndex,
  toggleMenu
} from '~/store/cmsActions'
import {AppDispatch, RootState} from '~/store/store'

import {CMSContext} from './context'
import {
  IndexKeyRefs,
  ChildPageTypeNamesKeyRefs,
  transformIndexTree
} from './utils'
import { login } from '~/store/authActions'

interface CMSProviderProps {
  settings: store.CMSSettings
  pages: ConnectedPageType[]
}

const CMSProvider: React.FC<CMSProviderProps> = ({
  settings,
  pages,
  children
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useStore<RootState>()

  const [registeredPages, setRegisteredPages] =
    useState<ConnectedPageType[]>(pages)

  const getRegisteredPage = (typeName: string) => {
    return registeredPages.find(page => page.PageType === typeName)
  }

  const getChildPageTypeNames = (typeName: string) =>
    getRegisteredPage(typeName)?.ChildPages.map(page => page.PageType)

  const authenticated = useSelector(
    (state: store.RootState) => state.auth.authenticated
  )

  const index = useSelector(
    (state: store.RootState) => state.cms.index || ({} as store.PageIndex)
  )

  const [treeData, setTreeData] = useState<components.ExplorerTDN[]>()

  const [keyRefs, setKeyRefs] = useState<{
    indexKey: IndexKeyRefs
    childPageTypeNamesKey: ChildPageTypeNamesKeyRefs
  }>()

  useEffect(() => {
    dispatch(setSettings(settings))
  }, [settings])

  useEffect(() => {
    if (index.pages && index.rootPageSlug) {
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
      const data: {
        dataLayer: {working: store.DataLayer}
        index: store.PageIndex
      } = await fetch(url, {cache: 'no-store'}).then(res => res.json())

      const layerOrigCksm = store.getState().cms.dataLayer.origCksm

      const cksm = md5(JSON.stringify(data)).toString()

      if (cksm !== layerOrigCksm) {
        dispatch(overrideWDL({data: data.dataLayer.working, cksm}))
        dispatch(setIndex(data.index))
      }
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

export default CMSProvider
