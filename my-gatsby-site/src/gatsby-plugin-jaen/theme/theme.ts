import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
  baseTheme
} from '@chakra-ui/react'

export const colors = {
  ...baseTheme.colors,
  brand: {
    ...baseTheme.colors.red,
    500: '#E3000F',
    600: '#E3000F'
  }
}

const theme = extendTheme(
  {
    colors,
    styles: {
      global: {}
    }
  },
  withDefaultColorScheme({
    colorScheme: 'brand'
  })
)

export default theme
