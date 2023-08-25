import {menuAnatomy as parts} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers} from '@chakra-ui/styled-system'

const {defineMultiStyleConfig, definePartsStyle} =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  list: {
    bg: 'bg.surface',
    boxShadow: 'lg'
  },
  item: {
    color: 'gray.700',
    bg: 'transparent',
    _dark: {
      color: 'gray.200'
    },
    _hover: {
      bg: 'brand.50',
      color: 'gray.800',
      _dark: {
        bg: 'brand.800',
        color: 'white'
      }
    },

    _focus: {
      bg: 'brand.100',
      color: 'gray.900',
      _dark: {
        bg: 'brand.800',
        color: 'white'
      }
    }
  }
})

export default defineMultiStyleConfig({baseStyle})
