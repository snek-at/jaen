import deepmerge from 'deepmerge'
import React, {createContext, useContext, useEffect} from 'react'
import {useAppSelector, withRedux} from '../redux'

import {SiteMetadata} from '../types'

// Define the type for your site metadata

// Create a context with initial data
const SiteMetadataContext = createContext<Partial<SiteMetadata> | undefined>(
  undefined
)

export interface SiteMetadataProviderProps {
  siteMetadata: Partial<SiteMetadata>
  children: React.ReactNode
}

// Create the provider component
export const SiteMetadataProvider: React.FC<SiteMetadataProviderProps> =
  withRedux(({children, siteMetadata}) => {
    const dynamicSiteMetadata = useAppSelector(state => state.site.siteMetadata)

    const [mergedSiteMetadata, setMergedSiteMetadata] =
      React.useState<Partial<SiteMetadata>>(siteMetadata)

    useEffect(() => {
      const merged = deepmerge(siteMetadata, dynamicSiteMetadata || {})

      setMergedSiteMetadata(merged)
    }, [dynamicSiteMetadata])

    return (
      <SiteMetadataContext.Provider value={mergedSiteMetadata}>
        {children}
      </SiteMetadataContext.Provider>
    )
  })

// Create a custom hook to use the context
export function useSiteMetadataContext() {
  const context = useContext(SiteMetadataContext)
  if (!context) {
    throw new Error(
      'useSiteMetadata must be used within a SiteMetadataProvider'
    )
  }
  return context
}
