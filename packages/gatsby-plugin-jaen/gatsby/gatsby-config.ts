import {GatsbyConfig} from 'gatsby'

const Config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-source-jaen`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [
          '/cms',
          '/cms/*',
          '/login',
          '/logout',
          '/password_reset',
          '/settings',
          '/signup'
        ],
        query: `
        {
          jaenSite {
            id
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        resolveSiteUrl: data => {
          console.log('RESOLVE SITE URL', data)
          return data.jaenSite?.siteMetadata?.siteUrl || 'https://page.jaen.io'
        },
        resolvePages: data => {
          return data.allSitePage.nodes.map(page => {
            return {...page}
          })
        },
        serialize: ({path, modifiedGmt}: any) => {
          return {
            url: path,
            lastmod: modifiedGmt
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jaen App`,
        short_name: `Jaen`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/favicon.ico`
      }
    }
  ]
}

export default Config
