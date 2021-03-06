/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 */
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'

import {JaenCoreProvider} from './src'
import theme from './src/@chakra-ui/theme'

export const onRenderBody = ({setPreBodyComponents}, pluginOptions) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />
  ])
}

export const wrapRootElement = ({element}, pluginOptions) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)

  return (
    <ChakraProvider theme={theme}>
      <JaenCoreProvider
        plugins={[]}
        remote={config.remote}
        initialHideUI={config.initialHideUI}>
        {element}
      </JaenCoreProvider>
    </ChakraProvider>
  )
}
