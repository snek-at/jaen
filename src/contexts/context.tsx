import React, {createContext, useContext} from 'react'
import {store, ConnectedPageType, PageParamsType} from '~/types'

export type CMSContextType = {
  registeredPages: ConnectedPageType[]
  setRegisteredPages: React.Dispatch<React.SetStateAction<ConnectedPageType[]>>
  getRegisteredPage: (typeName: string) => ConnectedPageType | undefined
  index: store.PageIndex
}

export type CMSPageContextType = {
  page: PageParamsType
  getChildPagesFromIndex: () => store.PageIndex['pages'][string][]
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
