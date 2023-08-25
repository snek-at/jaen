import {ColorModeScript} from '@chakra-ui/react'
import {GatsbySSR} from 'gatsby'

import {theme} from './src/theme/jaen-theme/index'

export {wrapPageElement} from './src/gatsby/wrap-page-element'
export {wrapRootElement} from './src/gatsby/wrap-root-element'

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
