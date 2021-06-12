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
import PageRouter from '~/router'
import {store, components, ConnectedPageType} from '~/types'

import Menu from '~/components/Menu'

import {
  setSettings,
  overrideWDL,
  setIndex,
  toggleMenu
} from '~/store/cmsActions'
import {AppDispatch} from '~/store/store'

import {CMSContext} from './context'
import {
  IndexKeyRefs,
  ChildPageTypeNamesKeyRefs,
  transformIndexTree
} from './utils'

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

  const [registeredPages, setRegisteredPages] =
    useState<ConnectedPageType[]>(pages)

  const getRegisteredPage = (typeName: string) => {
    return registeredPages.find(page => page.PageType === typeName)
  }

  const getChildPageTypeNames = (typeName: string) =>
    getRegisteredPage(typeName)?.ChildPages.map(page => page.PageType)

  const index = useSelector(
    (state: store.RootState) => state.cms.index || ({} as store.PageIndex)
  )
  const layerOrigCksm = useSelector(
    ({cms}: store.RootState) => cms.dataLayer.origCksm
  )
  const shouldOverrideWDL = useSelector(
    ({cms}: store.RootState) => cms.options.shouldOverrideWDL
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
    fetch(globalThis.location.origin + '/jaen-data.json').then(res =>
      res
        .json()
        .then(
          (data: {
            dataLayer: {working: store.DataLayer}
            index: store.PageIndex
          }) => {
            const cksm = md5(JSON.stringify(data)).toString()

            if (cksm !== layerOrigCksm || shouldOverrideWDL) {
              dispatch(overrideWDL({data: data.dataLayer.working, cksm}))
              dispatch(setIndex(data.index))
            }
          }
        )
    )
  })

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
        <Menu />
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
