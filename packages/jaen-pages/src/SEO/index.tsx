import {PageMetadata, SiteMetadata} from '@src/types'
import {StaticQuery, graphql} from 'gatsby'
import React from 'react'
import {Helmet} from 'react-helmet'

import SchemaOrg from './SchemaOrg'

interface SEOProps {
  pagePath?: string
  pageMeta?: PageMetadata
}

const SEO: React.FC<SEOProps> = ({pagePath, pageMeta}) => (
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
      }
    `}
    render={({
      site: {siteMetadata: seo}
    }: {
      site: {siteMetadata: SiteMetadata}
    }) => {
      const title = pageMeta?.title || seo.title
      const description = pageMeta?.description || seo.description
      const image = pageMeta?.image || seo.image
      const url = pagePath ? `${seo.siteUrl}${pagePath}` : seo.siteUrl
      const datePublished = pageMeta?.isBlogPost
        ? pageMeta.datePublished || false
        : false

      const isBlogPost = pageMeta?.isBlogPost || false

      return (
        <>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <link rel="canonical" href={url} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="fb:app_id" content={seo.social.fbAppID} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={seo.social.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            siteUrl={seo.siteUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </>
      )
    }}
  />
)

export default SEO
