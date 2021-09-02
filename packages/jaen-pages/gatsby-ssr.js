import {CMSProvider} from './src/contexts/cms'
import TemplateProvider from './src/contexts/template'

export const wrapRootElement = ({element}, pluginOptions) => {
  const config = require(___JAEN_CONFIG___)
  const templates = config.plugins.pages.templates.map(t => t.default)

  return <CMSProvider templates={templates}>{element}</CMSProvider>
}

export const wrapPageElement = ({element, props}, pluginOptions) => {
  const {pageContext} = props

  const {jaenPageContext} = pageContext

  return (
    <TemplateProvider jaenPageContext={jaenPageContext}>
      {element}
    </TemplateProvider>
  )
}
