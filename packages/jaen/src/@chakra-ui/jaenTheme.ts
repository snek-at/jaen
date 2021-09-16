//@ts-ignore
import {theme as baseTheme, extendTheme} from '@chakra-ui/react'

const jaenTheme = extendTheme({
  components: {
    Drawer: {
      sizes: {
        ...baseTheme.components.Drawer.sizes,
        '6xl': {dialog: {maxW: '8xl'}}
      }
    }
  }
})

export default jaenTheme
