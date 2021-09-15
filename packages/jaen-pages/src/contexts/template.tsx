import SEO from '@src/SEO'
import {createContext, useContext} from 'react'
import * as React from 'react'

import {store} from '../store'
import {PageType, ResolvedPageType} from '../types'
import {useCMSContext, useResolvedPage} from './cms'

// SEO: https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/master/src/components/SEO/SEO.js

interface TemplateProviderProps {
  jaenPageContext: {id: string} & PageType
}

export interface TemplateContextType extends TemplateProviderProps {
  page: ResolvedPageType
}

export const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
)

export const useTemplate = (): TemplateContextType => {
  const context = useContext(TemplateContext)

  if (context === undefined) {
    throw new Error('useTemplateContext must be within TemplateContext')
  }

  return context
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({
  children,
  jaenPageContext,
  ...props
}) => {
  const pathName = typeof window !== 'undefined' && window.location.pathname

  const dynamicPaths = store.getState().site.routing.dynamicPaths

  const page = useResolvedPage(
    (pathName && dynamicPaths[pathName]) || jaenPageContext.id
  )
  const {templates} = useCMSContext()

  const isDynamic = pathName && Object.keys(dynamicPaths).includes(pathName)

  const findTemplate = (name: string) => {
    const template = templates.find(t => t.TemplateName === name)

    if (!template) {
      throw new Error(`Template "${name}" not found`)
    }

    return template
  }

  const Template = page?.template ? findTemplate(page?.template) : null

  if (pathName && isDynamic) {
    jaenPageContext.id = dynamicPaths[pathName]
  }

  if ((typeof jaenPageContext.fields as any) === 'string') {
    jaenPageContext.fields = JSON.parse(jaenPageContext.fields as any)
  }

  if (!page || page.deleted) {
    return <>{'JaenPages 404'}</>
  }

  return (
    <TemplateContext.Provider value={{jaenPageContext, page}}>
      <SEO pageMeta={page.pageMetadata} pagePath={page.path} />
      {isDynamic && Template ? <Template /> : children}
    </TemplateContext.Provider>
  )
}

export default TemplateProvider
