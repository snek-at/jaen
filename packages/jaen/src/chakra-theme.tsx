import {extendTheme} from '@chakra-ui/react'

export const RevertCSSWrapper: React.FC = props => (
  <div className="jaen-revert-css" {...props} />
)

export const theme = extendTheme({
  styles: {
    global: {
      '.jaen-revert-css': {
        all: 'revert',
        '*': {
          all: 'revert'
        }
      }
    }
  }
})
