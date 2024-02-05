import {PluginOptions} from 'gatsby'

export interface JaenPluginOptions extends PluginOptions {
  zitadel: {
    organizationId: string
    clientId: string
    authority: string
    redirectUri: string
  }

  googleAnalytics?: {
    trackingIds?: string[]
  }
}
