import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {withRedux} from '@store/withRedux'
import * as buffer from 'buffer'
// import {PageTree} from '@snek-at/jaen-shared-ui'
import {StaticQuery, graphql} from 'gatsby'
import {createContext, useContext} from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import * as ts from 'typescript'

import {merge} from '../common/utils'
import {store, useAppSelector} from '../store'
import {
  JaenTemplate,
  PageMetadata,
  PageType,
  ResolvedPageType,
  SiteMetadata
} from '../types'
import {SiteType} from '../types'

export const WA_KEY = 'jaen-pages-site-wa'

//> Workaround for accessing the cms context outside of the component
export const storageGet = (): SiteType => {
  try {
    return JSON.parse(localStorage.getItem(WA_KEY) as string)
  } catch {
    return {} as SiteType
  }
}

export const storageSet = (site: SiteType) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(WA_KEY, JSON.stringify(site))
  }
}
//

type CMSContextType = {
  site: SiteType
  templates: JaenTemplate[]
}

const CMSContext = createContext<CMSContextType | undefined>(undefined)

export const useCMSContext = (): CMSContextType => {
  const context = useContext(CMSContext)

  if (context === undefined) {
    throw new Error('useCMSContext must be within CMSContext')
  }

  return context
}

export const usePage = (id: string): ResolvedPageType => {
  const context = useCMSContext()
  const storePages = useAppSelector(state => state.site.allSitePage)

  const nodes = context.site.allSitePage.nodes
  const cNode = merge(nodes[id], storePages?.nodes?.[id] || {}) as PageType

  let resolvedPage = ({...cNode} as unknown) as ResolvedPageType

  resolvedPage.parent = cNode.parent ? {page: nodes[cNode.parent.id]} : null

  resolvedPage.children = cNode.children.map(child => ({
    page: nodes[child.id]
  }))

  return resolvedPage
}

export const useResolvedPage = (id: string): ResolvedPageType | null => {
  const pages = usePages()
  const nodes = pages.nodes
  const cNode = nodes[id]

  if (!cNode) {
    // page not found in CMS
    return null
  }

  let resolvedPage = ({...cNode} as unknown) as ResolvedPageType

  resolvedPage.parent = cNode.parent ? {page: nodes[cNode.parent.id]} : null

  resolvedPage.children = cNode.children.map(child => ({
    page: nodes[child.id]
  }))

  return resolvedPage
}

export const useSiteMetadata = (): SiteMetadata => {
  const context = useCMSContext()
  const storeSiteMetadata = useAppSelector(state => state.site.siteMetadata)

  return merge(
    context.site.siteMetadata,
    storeSiteMetadata || {}
  ) as SiteMetadata
}

export const usePages = () => {
  const context = useCMSContext()
  const storePages = store.getState().site.allSitePage //useAppSelector(state => state.site.allSitePage)

  return merge(
    context.site.allSitePage,
    storePages || {}
  ) as typeof context.site.allSitePage
}

const WAStorage = withRedux(() => {
  const context = useCMSContext()
  const storePages = useAppSelector(state => state.site.allSitePage)

  const pages = merge(
    context.site.allSitePage,
    storePages || {}
  ) as typeof context.site.allSitePage

  const siteMetadata = useSiteMetadata() as SiteMetadata

  storageSet({allSitePage: pages, siteMetadata})

  return null
})

type CMSProviderType = {
  templates: JaenTemplate[]
}

export const CMSProvider: React.FC<CMSProviderType> = ({
  children,
  ...props
}) => {
  // Perf: Querying all the CMS pages in the CMSProvider may be slow, although it's
  // the fastest implementation. In future the PageProvider itself should query
  // its page content along with children and parent page.

  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              image
              author {
                name
              }
              organization {
                name
                url
                logo
              }
              social {
                twitter
                fbAppID
              }
            }
          }
          sitePageRootIds: allSitePage(filter: {parent: {id: {eq: null}}}) {
            distinct(field: id)
          }
          allFile {
            nodes {
              name
              id
            }
          }
          allSitePage {
            nodes {
              id
              path
              context {
                jaenPageContext {
                  id
                  slug
                  template
                  parent {
                    id
                  }
                  children {
                    id
                  }
                  pageMetadata {
                    title
                    description
                    image
                    canonical
                    datePublished
                    isBlogPost
                  }
                  fields {
                    _type
                  }
                  images {
                    id {
                      fieldName
                      pageId
                      block {
                        fieldName
                        position
                      }
                    }
                    file {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={({
        site: {siteMetadata},
        sitePageRootIds,
        allSitePage,
        allFile
      }) => {
        const site: SiteType = {
          allSitePage: {rootNodeIds: sitePageRootIds.distinct, nodes: {}},
          siteMetadata
        }

        for (const node of allSitePage.nodes) {
          const jaenPageContext = node.context?.jaenPageContext
          const id = jaenPageContext?.id || node.id

          site.allSitePage.nodes[id] = {
            parent: jaenPageContext?.parent || null,
            children: jaenPageContext?.children || [],
            path: node.path,
            slug: jaenPageContext?.slug,
            template: jaenPageContext?.template,
            fields: jaenPageContext?.fields,
            pageMetadata: jaenPageContext?.pageMetadata,
            images: jaenPageContext?.images
          }
        }

        return (
          <CMSContext.Provider
            value={{
              site: site,
              templates: props.templates
            }}>
            <WAStorage />
            {children}
          </CMSContext.Provider>
        )
      }}
    />
  )
}
