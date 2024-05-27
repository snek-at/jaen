import {GatsbyNode, PluginOptions} from 'gatsby'

export interface JaenMailpressPluginOptions extends PluginOptions {
  pylonUrl?: string
}

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
  Joi
}) => {
  return Joi.object({
    pylonUrl: Joi.string()
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] =
  async ({actions, plugins}, pluginOptions: JaenMailpressPluginOptions) => {
    // set as webpack variable

    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          __JAEN_MAILPRESS_PYLON_URL__: JSON.stringify(pluginOptions.pylonUrl)
        })
      ]
    })
  }
