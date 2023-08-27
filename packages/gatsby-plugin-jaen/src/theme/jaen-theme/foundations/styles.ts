import {defineStyle} from '@chakra-ui/styled-system'

export default {
  global: defineStyle({
    body: {
      color: 'fg.default',
      bg: 'bg.canvas'
    },
    '*::placeholder': {
      opacity: 1,
      color: 'fg.muted'
    },
    '*, *::before, &::after': {
      borderColor: 'border.default'
    },
    'html,body': {
      height: '100%'
    },
    '#__next, #root': {
      display: 'flex',
      flexDirection: 'column',
      minH: '100%'
    },
    '.jaen-highlight-frame': {
      borderRadius: '11px',
      pointerEvents: 'none',
      zIndex: 1
    },
    [`.jaen-highlight-frame:before`]: {
      content: '""',
      position: 'absolute',
      top: '-6px', // border: 2px + offset: 4px
      right: ' -6px', // border: 2px + offset: 4px
      bottom: '-6px', // border: 2px + offset: 4px
      left: '-6px', // border: 2px + offset: 4px
      border: ' 2px solid red',
      borderRadius: '15px', // border—radius: 11px + offset: 4px
      pointerEvents: 'none'
    }
  })
}
