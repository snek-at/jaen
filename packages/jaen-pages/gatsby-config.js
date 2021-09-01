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
