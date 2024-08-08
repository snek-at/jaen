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
import {Toaster} from '../components/ui/toaster'
import {Popup} from '../components/Popup'

const MediaModalComponent = lazy(
  async () => await import('../containers/media-modal')
)

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  {element},
  pluginOptions
) => {
  if (element?.type?.name === '' || element?.type?.name === 'Head') {
    return <SiteMetadataProvider>{element}</SiteMetadataProvider>
  }

  return (
    <ChakraProvider theme={theme} cssVarsRoot="#coco">
      <Toaster />

      <CookieConsentProvider>
        <NotificationsProvider>
          <AuthenticationProvider>
            <JaenUpdateModalProvider>
              <SiteMetadataProvider>
                <JaenFrameMenuProvider>
                  <MediaModalProvider MediaModalComponent={MediaModalComponent}>
                    <JaenWidgetProvider>
                      <Popup />
                      {element}
                    </JaenWidgetProvider>
                  </MediaModalProvider>
                </JaenFrameMenuProvider>
              </SiteMetadataProvider>
            </JaenUpdateModalProvider>
          </AuthenticationProvider>
        </NotificationsProvider>
      </CookieConsentProvider>
    </ChakraProvider>
  )
}
