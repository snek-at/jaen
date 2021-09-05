/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 */
import {JaenCoreProvider} from './src'

export const wrapRootElement = ({element}) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  return (
    <JaenCoreProvider plugins={[]} remote={config.remote}>
      {element}
    </JaenCoreProvider>
  )
}

// import {ChakraProvider} from '@chakra-ui/react'

// import {JaenCoreProvider} from './src'
// import {theme} from './src/chakra-theme'

// export const onRenderBody = ({setPreBodyComponents}, pluginOptions) => {
//   const enableChakraUI = pluginOptions.enableChakraUI

//   if (enableChakraUI) {
//     setPreBodyComponents([
//       <ColorModeScript
//         initialColorMode={theme.config.initialColorMode}
//         key="chakra-ui-no-flash"
//       />
//     ])
//   }
// }

// export const wrapRootElement = ({element}, pluginOptions) => {
//   const enableChakraUI = pluginOptions.enableChakraUI
//   // @ts-ignore
//   const config = require(___JAEN_CONFIG___)

//   const jaenCoreElement = (
//     <JaenCoreProvider plugins={[]} remote={config.remote}>
//       {element}
//     </JaenCoreProvider>
//   )

//   if (enableChakraUI) {
//     return <ChakraProvider theme={theme}>{jaenCoreElement}</ChakraProvider>
//   }

//   return jaenCoreElement
// }
