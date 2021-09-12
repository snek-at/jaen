import {ChakraProvider} from '@chakra-ui/react'

import {JaenCoreProvider} from './src'
import theme from './src/@chakra-ui/baseTheme'

export const wrapRootElement = ({element}, pluginOptions) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  const plugins = config.plugins || []

  const resolvedPlugins = Object.keys(plugins).map(key => {
    const plugin = plugins[key]

    return plugin.resolve.default
  })

  return (
    <ChakraProvider theme={theme}>
      <JaenCoreProvider plugins={resolvedPlugins} remote={config.remote}>
        {element}
      </JaenCoreProvider>
    </ChakraProvider>
  )
}
