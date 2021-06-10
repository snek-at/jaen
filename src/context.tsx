import React, {createContext, useContext} from 'react'

import {ConnectedPageType} from './components/pages'
import {PageType} from './components/types'

export type CMSContextType = {
  registeredPages: ConnectedPageType[]
  setRegisteredPages: React.Dispatch<React.SetStateAction<ConnectedPageType[]>>
  getRegisteredPage: (typeName: string) => ConnectedPageType | undefined
}

export type CMSPageContextType = {
  page: PageType
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined)
export const CMSPageContext = createContext<CMSPageContextType | undefined>(
  undefined
)

export const useCMSPageContext = () => {
  const context = useContext(CMSPageContext)
  if (context === undefined) {
    throw new Error('useCMSPageContext must be within PageProvider')
  }

  return context
}
