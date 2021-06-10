import React, {createContext, useContext} from 'react'

import {ConnectedPageType} from './components/pages'
import {PageType} from './components/types'
import {PageIndex} from './store/types'

export type CMSContextType = {
  registeredPages: ConnectedPageType[]
  setRegisteredPages: React.Dispatch<React.SetStateAction<ConnectedPageType[]>>
  getRegisteredPage: (typeName: string) => ConnectedPageType | undefined
  index: PageIndex
}

export type CMSPageContextType = {
  page: PageType
  getChildPagesFromIndex: () => PageIndex['pages'][string][]
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
