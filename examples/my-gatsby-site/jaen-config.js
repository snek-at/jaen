module.exports = {
  plugins: {
    pages: {
      resolve: require('@snek-at/jaen-pages'),
      templates: [require('./src/templates/SamplePage.tsx')]
    }
  }
}
