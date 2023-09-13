import {ChakraProvider} from '@chakra-ui/react'
import {
  AuthenticationProvider,
  MediaModalProvider,
  NotificationsProvider,
  JaenUpdateModalProvider,
  CookieConsentProvider
} from '@atsnek/jaen'
import {GatsbyBrowser} from 'gatsby'
import {lazy} from 'react'

import {JaenWidgetProvider} from '../contexts/jaen-widget'
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
      <CookieConsentProvider>
        <NotificationsProvider>
          <JaenUpdateModalProvider>
            <SiteMetadataProvider>
              <AuthenticationProvider
                snekResourceId={snekResourceId}
                JaenLoginComponent={JaenLogin}>
                <JaenFrameMenuProvider>
                  <MediaModalProvider MediaModalComponent={MediaModalComponent}>
                    <JaenWidgetProvider>{element}</JaenWidgetProvider>
                  </MediaModalProvider>
                </JaenFrameMenuProvider>
              </AuthenticationProvider>
            </SiteMetadataProvider>
          </JaenUpdateModalProvider>
        </NotificationsProvider>
      </CookieConsentProvider>
    </ChakraProvider>
  )
}
