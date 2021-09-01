require('source-map-support').install()
require('ts-node').register({compilerOptions: {esModuleInterop: true}})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@snek-at/jaen-pages']
      }
    }
  ]
}
