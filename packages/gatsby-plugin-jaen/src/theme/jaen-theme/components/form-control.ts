import {formAnatomy as parts} from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle
} from '@chakra-ui/styled-system'

const {definePartsStyle, defineMultiStyleConfig} =
  createMultiStyleConfigHelpers(parts.keys)

const $fg = cssVar('form-control-color')

const baseStyleRequiredIndicator = defineStyle({
  marginStart: '1',
  [$fg.variable]: 'colors.red.500',
  _dark: {
    [$fg.variable]: 'colors.red.300'
  },
  color: $fg.reference
})

const baseStyleHelperText = defineStyle({
  mt: '2',
  color: 'fg.muted',
  lineHeight: 'normal',
  fontSize: 'xs'
})

const baseStyle = definePartsStyle({
  container: {
    width: '100%',
    position: 'relative'
  },
  requiredIndicator: baseStyleRequiredIndicator,
  helperText: baseStyleHelperText
})

const formTheme = defineMultiStyleConfig({
  baseStyle
})

export default formTheme
