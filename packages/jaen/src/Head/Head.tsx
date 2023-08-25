import deepmerge from 'deepmerge'
import {HeadProps} from 'gatsby'
import React from 'react'

import {useSiteMetadataContext} from '../contexts/site-metadata'
import {useAppSelector, withRedux} from '../redux'
import {PageProps} from '../types'
import {getSchemaOrg} from './get-schema-org'

export const Head: React.FC<
  HeadProps<PageProps['data'], PageProps['pageContext']> & {
    children: React.ReactNode
  }
> = withRedux(props => {
  const siteMetadata = useSiteMetadataContext()

  const dynamicJaenPageMetadata = useAppSelector(
    state =>
      state.page.pages.nodes[props.pageContext.jaenPageId!]?.jaenPageMetadata
  )

  const defaultTitle = props.location.pathname

  const jaenPageMetadata = deepmerge(
    props.data.jaenPage?.jaenPageMetadata || {},
    dynamicJaenPageMetadata || {}
  )

  const title =
    jaenPageMetadata?.title ||
    props.pageContext.pageConfig?.label ||
    siteMetadata?.title ||
    defaultTitle

  const description = jaenPageMetadata?.description || siteMetadata?.description
  const image = jaenPageMetadata?.image || siteMetadata?.image
  const url = `${siteMetadata?.siteUrl}${props.location.pathname}`
  const isBlogPost = !!jaenPageMetadata?.blogPost || false
  const datePublished =
    (isBlogPost && jaenPageMetadata?.blogPost?.date) || false
  const fbAppID = siteMetadata?.social?.fbAppID
  const twitter = siteMetadata?.social?.twitter

  const schemaOrgJSON = getSchemaOrg({
    author: siteMetadata?.author,
    datePublished,
    defaultTitle,
    description: description || '',
    image: image || '',
    isBlogPost,
    organization: siteMetadata?.organization,
    title,
    siteUrl: siteMetadata?.siteUrl || '',
    url
  })

  return (
    <>
      <title id="title">{title}</title>
      <meta id="meta-description" name="description" content={description} />
      <meta id="meta-image" name="image" content={image} />
      <link id="canonical-link" rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta id="og-url" property="og:url" content={url} />
      {isBlogPost ? (
        <meta id="og-type" property="og:type" content="article" />
      ) : null}
      <meta id="og-title" property="og:title" content={title} />
      <meta
        id="og-description"
        property="og:description"
        content={description}
      />
      <meta id="og-image" property="og:image" content={image} />
      <meta id="fb-app-id" property="fb:app_id" content={fbAppID} />

      {/* Twitter Card tags */}
      <meta
        id="twitter-card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta id="twitter-creator" name="twitter:creator" content={twitter} />
      <meta id="twitter-title" name="twitter:title" content={title} />
      <meta
        id="twitter-description"
        name="twitter:description"
        content={description}
      />
      <meta id="twitter-image" name="twitter:image" content={image} />

      {/* Schema.org tags */}
      <script id="schema-org" type="application/ld+json">
        {JSON.stringify(schemaOrgJSON)}
      </script>

      {props.children}
    </>
  )
})
