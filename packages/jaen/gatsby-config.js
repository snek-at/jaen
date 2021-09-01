module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['@snek-at/jaen']
      }
    },
    'gatsby-plugin-emotion'
    // {
    //   resolve: '@snek-at/gatsby-plugin-chakra-ui',
    //   options: {disableProvider: true}
    // }
  ]
}
