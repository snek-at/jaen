import {ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'

import theme from './theme'

const Provider: React.FC = ({children}) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true} portalZIndex={40}>
      {children}
    </ChakraProvider>
  )
}

export default Provider
