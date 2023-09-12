export * from './connectors'
export {
  AuthenticationProvider,
  useAuthenticationContext,
  withAuthentication,
  SnekUser
} from './contexts/authentication'
export {
  CMSManagementProvider,
  useCMSManagementContext,
  DuplicateSlugError
} from './contexts/cms-management'
export {useContentManagement} from './hooks/use-content-management'
export {FieldHighlighterProvider} from './contexts/field-highlighter'
export {
  NotificationsProvider,
  useNotificationsContext
} from './contexts/notifications'
export {usePageContext, useJaenPageIndex, PageProvider} from './contexts/page'
export {useSectionBlockContext, SectionBlockContextType} from './contexts/block'
export {useSectionField, UseSectionField} from './hooks/use-section-field'
export {Field} from './fields'
export {useField} from './hooks/use-field'
export {
  JaenPage,
  PageConfig,
  PageProps,
  JaenTemplate,
  MediaNode,
  LayoutProps,
  SiteMetadata,
  ISite as JaenSite,
  Widget
} from './types'
export {generatePageOriginPath} from './utils/path'
export * from './utils/open-storage-gateway'

export {useDynamicPaths} from './hooks/use-dynamic-paths'
export {useMediaModal, MediaModalProvider} from './contexts/media-modal'

export {withRedux} from './redux'

export {
  SiteMetadataProvider,
  useSiteMetadataContext
} from './contexts/site-metadata'

export {
  JaenUpdateModalProvider,
  useJaenUpdateModalContext
} from './contexts/jaen-update-modal'

export {
  CookieConsentProvider,
  useCookieConsentContext
} from './contexts/cookie-consent'

export {WidgetProvider, useWidgetContext} from './contexts/widget'

export {useWidget} from './hooks/use-widget'

export {Head} from './Head'

export {PhotoProvider} from 'react-photo-view'

export const snekResourceId = __SNEK_RESOURCE_ID__
