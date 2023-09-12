import {GatsbyNode, Reporter} from 'gatsby'
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

export const createPages: GatsbyNode['createPages'] = async (
  {actions, store, reporter},
  pluginOptions
) => {
  const snekResourceId = pluginOptions.snekResourceId as string | undefined

  // Create JaenFrame slice

  actions.createSlice({
    id: `jaen-frame`,
    component: path.resolve(__dirname, '../../src/slices/jaen-frame.tsx')
  })

  // Override gatsby-plugin-manifest to use our own
  const state = store.getState()

  const plugin = state.flattenedPlugins.find(
    plugin => plugin.name === 'gatsby-plugin-manifest'
  )
  if (plugin) {
    const manifestOptions = await resolveManifestOptions({
      snekResourceId,
      reporter
    })
    plugin.pluginOptions = {...plugin.pluginOptions, ...manifestOptions}
  }
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
