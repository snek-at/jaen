module.exports = {
  remote: 'snek-at/jaen-template',
  initialHideUI: false, // optional hide UI on load
  plugins: {
    pages: {
      resolve: require('@snek-at/jaen-pages/jaen-register'),
      templates: [require('./src/templates/SamplePage.tsx')]
    }
  }
}
