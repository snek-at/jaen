const path = require('path')

const siteMetadata = require('./site-metadata')

module.exports = {
  siteMetadata,
  plugins: [
    '@snek-at/jaen',
    {
      resolve: '@snek-at/jaen-pages',
      options: {
        templates: {
          SamplePage: path.resolve('src/templates/SamplePage.tsx')
        }
      }
    }
  ]
}
