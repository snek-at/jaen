import type {GatsbyNode} from 'gatsby'
import * as path from 'path'

import {PluginOptions} from './types'

// require = require('esm')(module)

const configFile = path.resolve('./jaen-config.js')

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = (
  {plugins, actions, loaders, stage},
  pluginOptions: PluginOptions
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
