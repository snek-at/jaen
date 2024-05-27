import {tableAnatomy as parts} from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle
} from '@chakra-ui/styled-system'
import {mode} from '@chakra-ui/theme-tools'

const {defineMultiStyleConfig, definePartsStyle} =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  table: {
    bg: 'bg.surface',
    border: '1px solid',
    borderColor: 'border.emphasized',
    borderRadius: 'lg',
    borderSpacing: '0',
    borderCollapse: 'separate',
    overflow: 'hidden'
  },
  th: {
    border: 'none',
    fontWeight: 'medium',
    textTransform: 'normal',
    letterSpacing: 'normal',
    borderTopWidth: '1px',
    whiteSpace: 'nowrap',
    bg: 'bg.subtle'
  },
  td: {
    textAlign: 'start'
  },

  caption: {
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium'
  }
})

const numericStyles = defineStyle({
  '&[data-is-numeric=true]': {
    textAlign: 'end'
  }
})

const variantSimple = definePartsStyle(props => {
  return {
    // tbody: {
    //   tr: {

    //   }
    // },
    th: {
      borderBottom: '1px',
      borderColor: 'border.emphasized',
      color: 'fg.muted',
      ...numericStyles
    },
    td: {
      borderBottom: '1px',
      borderColor: 'border.emphasized',
      ...numericStyles
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props)
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: {borderBottomWidth: 0}
        }
      }
    }
  }
})

const variantStripe = definePartsStyle(props => {
  const {colorScheme: c} = props

  return {
    th: {
      borderBottom: '1px',
      borderColor: 'border.emphasized',
      color: 'fg.muted',
      ...numericStyles
    },
    td: {
      borderBottom: '1px',
      borderColor: 'border.emphasized',
      ...numericStyles
    },
    caption: {
      color: mode('gray.600', 'gray.100')(props)
    },
    tbody: {
      tr: {
        '&:nth-of-type(odd)': {
          'th, td': {
            borderBottomWidth: '1px',
            borderColor: 'border.emphasized'
          },
          td: {
            background: mode(`${c}.100`, `${c}.700`)(props)
          }
        }
      }
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: {borderBottomWidth: 0}
        }
      }
    }
  }
})

const variants = {
  simple: variantSimple,
  striped: variantStripe,
  unstyled: defineStyle({})
}

const sizes = {
  md: definePartsStyle({
    th: {
      lineHeight: '1.25rem'
    },
    td: {
      fontSize: 'sm'
    }
  })
}

const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'simple',
    size: 'md',
    colorScheme: 'gray'
  }
})

export default tableTheme
