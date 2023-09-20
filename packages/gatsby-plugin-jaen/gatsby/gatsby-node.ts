import {GatsbyNode, Reporter, PluginOptions} from 'gatsby'
import path from 'path'

export interface JaenPluginOptions extends PluginOptions {
  snekResourceId?: string
  googleAnalytics?: {
    trackingIds?: string[]
  }
}

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
  Joi
}) => {
  return Joi.object({
    snekResourceId: Joi.string().required(),
    googleAnalytics: Joi.object({
      trackingIds: Joi.array().items(Joi.string())
    })
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] =
  async (
    {actions, loaders, stage, plugins},
    pluginOptions: JaenPluginOptions
  ) => {
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

export const onPreInit: GatsbyNode['onPreInit'] = async (
  {store, reporter},
  pluginOptions: JaenPluginOptions
) => {
  // find and remove gatsby-plugin-manifest from store
  const state = store.getState()

  const manifestPlugin = state.flattenedPlugins.find(
    plugin => plugin.name === 'gatsby-plugin-manifest'
  )

  if (manifestPlugin) {
    const manifestOptions = await resolveManifestOptions({
      snekResourceId: pluginOptions.snekResourceId,
      reporter
    })
    manifestPlugin.pluginOptions = {
      ...manifestPlugin.pluginOptions,
      ...manifestOptions
    }
  }

  // Override the gatsby-plugin-google-gtag trackingIds
  const gtagPlugin = state.flattenedPlugins.find(
    plugin => plugin.name === 'gatsby-plugin-google-gtag'
  )

  if (gtagPlugin) {
    // When no trackingIds are set, use [] as default
    // This should disable gtag
    const trackingIds = pluginOptions.googleAnalytics?.trackingIds || []

    if (trackingIds) {
      gtagPlugin.pluginOptions.trackingIds.push(...trackingIds)
    }
  }

  // state.flattenedPlugins[state.flattenedPlugins.indexOf(manifestPlugin)] =
  //   manifestPlugin
  // state.flattenedPlugins[state.flattenedPlugins.indexOf(gtagPlugin)] =
  //   gtagPlugin

  // // push back to store
  // store.dispatch({
  //   type: `SET_SITE_FLATTENED_PLUGINS`,
  //   payload: state.flattenedPlugins
  // })
}

export const createPages: GatsbyNode['createPages'] = async (
  {actions, store, reporter},
  pluginOptions: JaenPluginOptions
) => {
  const snekResourceId = pluginOptions.snekResourceId as string | undefined

  // Create JaenFrame slice

  actions.createSlice({
    id: `jaen-frame`,
    component: path.resolve(__dirname, '../../src/slices/jaen-frame.tsx')
  })
}

const resolveManifestOptions = async ({
  snekResourceId,
  reporter
}: {
  snekResourceId?: string
  reporter: Reporter
}) => {
  // Fetch from services.snek.at

  let resource: {
    id: string
    name: string
  }

  try {
    const query = `
  query Manifest($resourceId: String!) {
    resource(id: $resourceId) {
      id
      name
    }
  }
  `

    const variables = {
      resourceId: snekResourceId
    }

    const response = await fetch('https://services.snek.at/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query, variables})
    })

    const json = await response.json()

    if (json.errors) {
      throw new Error(json.errors[0].message)
    }

    resource = json.data.resource
  } catch (err) {
    reporter.warn(
      `gatsby-plugin-manifest - failed to fetch resource ${snekResourceId} from services.snek.at`
    )

    resource = {
      id: 'dev',
      name: 'Development Resource'
    }
  }

  return {
    name: resource.name,
    short_name: resource.name,
    start_url: '/',
    background_color: `#f7f0eb`,
    theme_color: `#a2466c`,
    display: `standalone`,
    icon: `src/favicon.ico`
  }
}
