module.exports = {
  remote: 'snek-at/jaen-template',
  plugins: {
    pages: {
      resolve: require('@snek-at/jaen-pages/jaen-register'),
      templates: [require('./src/templates/SamplePage.tsx')]
    }
  }
}
