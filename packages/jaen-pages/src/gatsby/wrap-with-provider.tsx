import type {GatsbyBrowser, GatsbySSR} from 'gatsby'

import {CMSProvider} from '../contexts/cms'
import TemplateProvider from '../contexts/template'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  {element},
  pluginOptions
) => {
  // @ts-ignore
  const config = require(___JAEN_CONFIG___)
  const templates = config.plugins.pages.templates.map((t: any) => t.default)

  return <CMSProvider templates={templates}>{element}</CMSProvider>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = (
  {element, props},
  pluginOptions
) => {
  const {pageContext} = props

  const pageId = pageContext.jaenPageId as string

  return <TemplateProvider id={pageId}>{element}</TemplateProvider>
}
