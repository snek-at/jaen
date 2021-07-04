/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import CryptoJS from 'crypto-js'
import {isEqual} from 'lodash'
import React, {useEffect} from 'react'
import {Provider as ReduxProvider, useDispatch, useSelector} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import PageRouter from '~/router'
import {persistor, store} from '~/store'
import {store as storeTypes, ConnectedPageType} from '~/types'

import {isDev} from '~/common/utils'

import MgmtOverlay from '~/components/MgmtOverlay'
import Notify from '~/components/Notify'

import {overrideWDL, setSettings} from '~/store/actions/cms'
import {pagesSelector, rootPageSlugSelector} from '~/store/selectors/cms'

import {CMSContext} from './context'

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
  const rootPageSlug = useSelector(rootPageSlugSelector)

  // only rerender if page details changes
  const dataLayerPages = useSelector(pagesSelector, (l, r) => {
    const lKeys = Object.keys(l)
    const rKeys = Object.keys(r)

    if (!isEqual(lKeys, rKeys)) {
      return false
    }

    for (const slug of lKeys) {
      return isEqual(l[slug].details, r[slug].details)
    }

    return true
  })

  // remove fields from dataLayerPages because they are not up to date
  const pagesDetails = Object.fromEntries(
    Object.entries(dataLayerPages).map(([slug, page]) => [slug, page.details])
  )

  useEffect(() => {
    dispatch(setSettings(settings))
  }, [dispatch, settings])

  useEffect(() => {
    const fetchFile = async (url: string): Promise<void> => {
      const res = await fetch(url, {cache: 'no-store'})
      const data: {
        dataLayer: {working: storeTypes.WorkingDataLayer}
      } = await res.json()

      const checksum = store.getState().cms.dataLayerChecksum
      const calcChecksum = CryptoJS.SHA256(JSON.stringify(data)).toString(
        CryptoJS.enc.Hex
      )

      if (checksum !== calcChecksum) {
        dispatch(
          overrideWDL({
            workingDataLayer: data.dataLayer.working,
            checksum: calcChecksum
          })
        )
      }
    }

    const fetchRemote = async (): Promise<void> =>
      fetchFile(
        `https://raw.githubusercontent.com/${settings.gitRemote}/gh-pages/jaen-data.json`
      )

    if (isDev()) {
      fetchRemote()
    } else {
      fetchFile(`${globalThis.location.origin}/jaen-data.json`)
    }

    if (settings.gitRemote) {
      const interval = setInterval(() => {
        fetchRemote()
      }, 1000 * 60 * 1)
      return () => clearInterval(interval)
    } else {
      console.warn(
        // eslint-disable-next-line no-template-curly-in-string
        'Cannot fetch `https://raw.githubusercontent.com/${settings.gitRemote}/gh-pages/jaen-data.json` because gitRemote is undefined'
      )
    }
  }, [dispatch, settings.gitRemote])

  return (
    <CMSContext.Provider
      value={{
        registeredPages: pages,
        rootPageSlug,
        pagesDetails
      }}>
      <PageRouter>
        <Notify />
        <MgmtOverlay />
      </PageRouter>
      {children}
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
