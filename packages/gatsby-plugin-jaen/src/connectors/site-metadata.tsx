import {
  SiteMetadata,
  SiteMetadataProvider as JaenSiteMetadataProvider
} from 'jaen'
import {useStaticQuery, graphql} from 'gatsby'

export interface SiteMetadataProps {
  children: React.ReactNode
}

export const SiteMetadataProvider: React.FC<SiteMetadataProps> = ({
  children
}) => {
  const {jaenSite} = useStaticQuery<{
    jaenSite?: {
      siteMetadata?: SiteMetadata
    }
  }>(graphql`
    query {
      jaenSite {
        siteMetadata {
          ...JaenSiteMetadataData
        }
      }
    }
  `)

  return (
    <JaenSiteMetadataProvider siteMetadata={jaenSite?.siteMetadata || {}}>
      {children}
    </JaenSiteMetadataProvider>
  )
}
