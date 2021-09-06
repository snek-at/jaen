import {ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'

import {theme} from "@snek-at/jaen"

export const wrapRootElement = ({element}) => {
  return <ChakraProvider resetCSS={false} theme={theme}>{element}</ChakraProvider>
}
