import {PageConfig} from '@atsnek/jaen'
import {GatsbyNode, PluginOptions} from 'gatsby'

export interface JaenLensPluginOptions extends PluginOptions {
  roles?: string[]
}

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
  Joi
}) => {
  return Joi.object({
    roles: Joi.array().items(Joi.string())
  })
}

export const onCreatePage: GatsbyNode['onCreatePage'] = async (
  {page, actions},
  pluginOptions: JaenLensPluginOptions
) => {
  // intercept page creation of this plugin and update page context

  const {createPage, deletePage} = actions

  if (page.path.startsWith('/lens')) {
    deletePage(page)

    const pageConfig = page?.context?.pageConfig as PageConfig

    createPage({
      ...page,
      context: {
        ...page.context,
        pageConfig: {
          ...pageConfig,
          auth: {
            ...pageConfig?.auth,
            isRequired: true,
            roles: pluginOptions.roles
          }
        }
      }
    })
  }
}
