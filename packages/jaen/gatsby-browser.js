import {ChakraProvider} from '@chakra-ui/react'

import {JaenCoreProvider} from './src'
import {theme} from './src/chakra-theme'

export const wrapRootElement = ({element}, pluginOptions) => {
  const enableChakraUI = pluginOptions.enableChakraUI
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  const plugins = config.plugins || []

  const resolvedPlugins = Object.keys(plugins).map(key => {
    const plugin = plugins[key]

    return plugin.resolve.default
  })

  const jaenCoreElement = (
    <JaenCoreProvider plugins={resolvedPlugins} remote={config.remote}>
      {element}
    </JaenCoreProvider>
  )

  if (enableChakraUI) {
    return <ChakraProvider theme={theme}>{jaenCoreElement}</ChakraProvider>
  }

  return jaenCoreElement
}
