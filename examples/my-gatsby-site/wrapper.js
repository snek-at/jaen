import {ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'

export const wrapRootElement = ({element}) => {
  return <ChakraProvider resetCSS={false}>{element}</ChakraProvider>
}
