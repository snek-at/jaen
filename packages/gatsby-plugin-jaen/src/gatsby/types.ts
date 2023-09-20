import {PluginOptions} from 'gatsby'

export interface JaenPluginOptions extends PluginOptions {
  snekResourceId?: string
  googleAnalytics?: {
    trackingIds?: string[]
  }
}
