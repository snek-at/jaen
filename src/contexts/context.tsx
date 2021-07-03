/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {createContext, useContext} from 'react'
import {store as storeTypes, ConnectedPageType} from '~/types'

export type CMSContextType = {
  registeredPages: ConnectedPageType[]
  rootPageSlug: string
  pagesDetails: storeTypes.PagesDetails
}

export type CMSPageContextType = {
  slug: string
  typeName: string
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined)
export const CMSPageContext = createContext<CMSPageContextType | undefined>(
  undefined
)

export const useCMSContext = () => {
  const context = useContext(CMSContext)
  if (context === undefined) {
    throw new Error('useCMSContext must be within CMSProvider')
  }

  return context
}

export const useCMSPageContext = () => {
  const context = useContext(CMSPageContext)
  if (context === undefined) {
    throw new Error('useCMSPageContext must be within PageProvider')
  }

  return context
}
