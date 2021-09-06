import {extendTheme} from '@chakra-ui/react'
import styled from '@emotion/styled'

export const RevertCSSWrapper = styled.div`
  all: revert;

  * {
    all: revert;
  }
`

export const theme = extendTheme({})
