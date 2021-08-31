import {ColorModeScript} from '@chakra-ui/react'
import type {GatsbySSR} from 'gatsby'

import theme from './theme'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents
}) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />
  ])
}
