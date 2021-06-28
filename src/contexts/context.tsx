import React, {createContext, useContext} from 'react'
import {store, components, ConnectedPageType, PageParamsType} from '~/types'

import {IndexKeyRefs, ChildPageTypeNamesKeyRefs} from './utils'

export type CMSContextType = {
  registeredPages: ConnectedPageType[]
  setRegisteredPages: React.Dispatch<React.SetStateAction<ConnectedPageType[]>>
  getRegisteredPage: (typeName: string) => ConnectedPageType | undefined
  index: store.PageIndex | undefined
  treeData: components.ExplorerTDN[] | undefined
  keyRefs:
    | {
        indexKey: IndexKeyRefs
        childPageTypeNamesKey: ChildPageTypeNamesKeyRefs
      }
    | undefined
}

export type CMSPageContextType = {
  page: PageParamsType
  getChildPagesFromIndex: (
    fixedSlug?: string
  ) => store.PageIndex['pages'][string][]
  getHiddenSlugs: () => string[]
  setHiddenChildSlugs: (slugs: string[]) => void
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
