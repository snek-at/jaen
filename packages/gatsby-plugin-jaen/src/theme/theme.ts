import {baseTheme, extendTheme} from '@chakra-ui/react'

const theme = {
  colors: {
    ...baseTheme.colors,
    brand: baseTheme.colors.pink
  }
}

export default extendTheme(theme)
