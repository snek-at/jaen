export interface Organization {
  name?: string
  url?: string
  logo?: string
}

export interface SchemaOrg {
  title: string
  url: string
  author?: {
    name?: string
  }
  siteUrl: string
  datePublished: string | false
  defaultTitle: string
  description?: string
  image?: string
  isBlogPost: boolean
  organization?: Organization
}

export const getSchemaOrg = ({
  author,
  siteUrl,
  datePublished,
  defaultTitle,
  description,
  image,
  isBlogPost,
  organization,
  title,
  url
}: SchemaOrg) => {
  const schema: {
    '@context': string
    '@graph': any[]
  } = {
    '@context': 'http://schema.org',
    '@graph': []
  }

  schema['@graph'].push({
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: defaultTitle
  })

  if (isBlogPost) {
    schema['@graph'] = schema['@graph'].concat([
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@type': 'BlogPosting',
        url,
        name: title,
        alternateName: defaultTitle,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description,
        author: {
          '@type': 'Person',
          name: author?.name
        },
        publisher: {
          '@type': 'Organization',
          url: organization?.url,
          logo: {
            '@type': 'ImageObject',
            url: organization?.logo
          },
          name: organization?.name
        },
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': siteUrl
        },
        datePublished
      }
    ])
  }

  return schema
}
