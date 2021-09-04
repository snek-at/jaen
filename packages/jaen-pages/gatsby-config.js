const path = require('path')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@snek-at/jaen-pages']
      }
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          '@actions': path.resolve(__dirname, 'src/store/actions'),
          '@store': path.resolve(__dirname, 'src/store'),
          '@src': path.resolve(__dirname, 'src'),
          '@containers': path.resolve(__dirname, 'src/containers'),
          '@reducers': path.resolve(__dirname, 'src/store/reducers'),
          '@contexts': path.resolve(__dirname, 'src/contexts'),
          '@common': path.resolve(__dirname, 'src/common')
        }
      }
    }
  ]
}
