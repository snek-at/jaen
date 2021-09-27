const path = require('path')

const configFile = path.resolve('./jaen-config.js')

exports.onCreateWebpackConfig = (
  {plugins, actions, loaders, stage},
  pluginOptions
) => {
  actions.setWebpackConfig({
    plugins: [plugins.define({___JAEN_CONFIG___: JSON.stringify(configFile)})]
  })

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
