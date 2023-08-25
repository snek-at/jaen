import {GatsbyNode} from 'gatsby'
import path from 'path'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] =
  async ({actions, loaders, stage, plugins}, pluginOptions) => {
    const snekResourceId = pluginOptions.snekResourceId

    if (!snekResourceId) {
      throw new Error(
        `The plugin option 'snekResourceId' is required. Please add the option to your gatsby-config.js file.`
      )
    }

    const {version} = await import('@atsnek/jaen/package.json')

    if (stage === 'build-html' || stage === 'develop-html') {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /filerobot-image-editor/,
              use: loaders.null()
            },
            {
              test: /reagraph/,
              use: loaders.null()
            }
          ]
        }
      })
    }

    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          __VERSION__: JSON.stringify(version),
          __SNEK_RESOURCE_ID__: JSON.stringify(snekResourceId)
        })
      ]
    })
  }

export const createPages: GatsbyNode['createPages'] = async ({actions}) => {
  // Create JaenFrame slice

  actions.createSlice({
    id: `jaen-frame`,
    component: path.resolve(__dirname, '../../src/slices/jaen-frame.tsx')
  })
}
