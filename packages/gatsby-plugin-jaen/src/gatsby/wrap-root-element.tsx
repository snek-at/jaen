import {ChakraProvider} from '@chakra-ui/react'
import {
  AuthenticationProvider,
  FieldHighlighterProvider,
  MediaModalProvider,
  NotificationsProvider,
  JaenUpdateModalProvider
} from '@atsnek/jaen'
import {GatsbyBrowser} from 'gatsby'
import {lazy} from 'react'

import {SiteMetadataProvider} from '../connectors/site-metadata'
import {theme} from '../theme/jaen-theme/index'
import {JaenFrameMenuProvider} from '../contexts/jaen-frame-menu'

const JaenLogin = lazy(
  async () => await import('../components/JaenLogin/JaenLogin')
)

const MediaModalComponent = lazy(
  async () => await import('../containers/media-modal')
)

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  {element},
  pluginOptions
) => {
  const snekResourceId = pluginOptions.snekResourceId as string

  if (!snekResourceId) {
    throw new Error('snekResourceId is not defined')
  }

  if (element?.type?.name === '' || element?.type?.name === 'Head') {
    return <SiteMetadataProvider>{element}</SiteMetadataProvider>
  }

  return (
    <ChakraProvider theme={theme} cssVarsRoot="#coco">
      <NotificationsProvider>
        <JaenUpdateModalProvider>
          <FieldHighlighterProvider theme={theme}>
            <SiteMetadataProvider>
              <AuthenticationProvider
                snekResourceId={snekResourceId}
                JaenLoginComponent={JaenLogin}>
                <JaenFrameMenuProvider>
                  <MediaModalProvider MediaModalComponent={MediaModalComponent}>
                    {element}
                  </MediaModalProvider>
                </JaenFrameMenuProvider>
              </AuthenticationProvider>
            </SiteMetadataProvider>
          </FieldHighlighterProvider>
        </JaenUpdateModalProvider>
      </NotificationsProvider>
    </ChakraProvider>
  )
}
