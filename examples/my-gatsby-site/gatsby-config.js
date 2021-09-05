const path = require('path')

const siteMetadata = require('./site-metadata')

module.exports = {
  siteMetadata,
  plugins: [
    {
      resolve: '@snek-at/jaen',
      options: {
        enableChakraUI: true
      }
    },
    {
      resolve: '@snek-at/jaen-pages',
      options: {
        templates: {
          SamplePage: path.resolve('src/templates/SamplePage.tsx')
        }
      }
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        devMode: true
      }
    }
  ]
}
