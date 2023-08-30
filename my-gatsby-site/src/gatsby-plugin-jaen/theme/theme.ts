import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
  baseTheme
} from '@chakra-ui/react'

export const colors = {
  ...baseTheme.colors,
  brand: {
    ...baseTheme.colors.blue
    // 500: '#E3000F',
    // 600: '#E3000F'
  }
}

const theme = extendTheme(
  {colors},
  withDefaultColorScheme({
    colorScheme: 'blue'
  })
)

export default theme
