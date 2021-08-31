import {JaenCoreProvider} from './src'

export const wrapRootElement = ({element}) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  const plugins = config.plugins || []

  const resolvedPlugins = Object.keys(plugins).map(key => {
    const plugin = plugins[key]

    return plugin.resolve.default
  })

  return (
    <JaenCoreProvider plugins={resolvedPlugins}>{element}</JaenCoreProvider>
  )
}
