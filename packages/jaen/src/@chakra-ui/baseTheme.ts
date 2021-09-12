//@ts-ignore
import {theme as baseTheme, extendTheme} from '@chakra-ui/react'

import userTheme from './theme'

const jaenTheme = extendTheme(
  {
    components: {
      Drawer: {
        sizes: {
          ...baseTheme.components.Drawer.sizes,
          '6xl': {dialog: {minW: '8xl', maxW: '8xl'}}
        }
      }
    }
  },
  userTheme
)

export default jaenTheme
