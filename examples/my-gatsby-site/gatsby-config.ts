import type {GatsbyConfig} from 'gatsby'

require('dotenv').config()

console.log('ENV', process.env.GATSBY_LENS_API_URL)

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        remote: {
          repository: 'atsnek/jaen-starter'
        },
        zitadel: {
          organizationId: '252746033782587395',
          clientId: '252746210698395651@services',
          authority: 'https://accounts.cronit.io',
          redirectUri:
            process.env.NODE_ENV === 'production'
              ? 'https://cronit.io'
              : 'http://localhost:8000',
          projectIds: [
            '252765861113233411',
            '252899191242620931',
            '260237544631828483'
          ]
        },
        googleAnalytics: {
          trackingIds: ['G-M58K75M9PG']
        },
        sentry: {
          org: 'cronit',
          project: 'jaen-my-gatsby-site',
          dsn: 'https://72993150e27f8a2a4b37fa1cfc3cdb60@sentry.cronit.io/2'
        }
      }
    },
    `gatsby-jaen-mailpress`
    // 'gatsby-plugin-webpack-bundle-analyser-v2'
  ]
}

export default config
