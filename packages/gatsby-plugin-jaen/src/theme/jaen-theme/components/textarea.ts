import {mode, StyleFunctionProps, transparentize} from '@chakra-ui/theme-tools'
import {defineStyle, defineStyleConfig} from '@chakra-ui/styled-system'
import inputTheme from './input'

const baseStyle = defineStyle({
  ...inputTheme.baseStyle?.field,
  paddingY: '2',
  minHeight: '20',
  lineHeight: 'short',
  verticalAlign: 'top'
})

const variants = {
  outline: (props: StyleFunctionProps) => ({
    borderRadius: 'lg',
    borderColor: 'border.emphasized',
    bg: 'bg.surface',
    _hover: {borderColor: 'border.active'},
    _focus: {
      borderColor: mode('brand.500', 'brand.200')(props),
      boxShadow: mode(
        `0px 0px 0px 1px ${transparentize(`brand.500`, 1.0)(props.theme)}`,
        `0px 0px 0px 1px ${transparentize(`brand.200`, 1.0)(props.theme)}`
      )(props)
    }
  })
}

export default defineStyleConfig({
  baseStyle,
  variants
})
