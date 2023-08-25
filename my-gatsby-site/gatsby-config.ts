import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    `gatsby-jaen-lens`,
    {
      resolve: `gatsby-plugin-jaen`,
      options: {
        // The folder where the page templates are located
        pageTemplateFolder: `src/templates`,
        snekResourceId: `63571eee-f41c-4745-9130-d746c2cb97a3`
      }
    }
  ]
}

export default config
