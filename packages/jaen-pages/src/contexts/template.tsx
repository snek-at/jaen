import {createContext, useContext} from 'react'
import {useSelector} from 'react-redux'

import {useAppSelector} from '../store'
import {withRedux} from '../store/withRedux'
import {ResolvedPageType} from '../types'
import {useCMSContext, useCMSPage} from './cms'

// SEO: https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/master/src/components/SEO/SEO.js

export type TemplateContextType = {
  pageId: string
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

type TemplateProviderProps = {
  id: string
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({
  children,
  id,
  ...props
}) => {
  const pathName = typeof window !== 'undefined' && window.location.pathname

  const dynamicPaths = useAppSelector(({site}) => site.routing.dynamicPaths)

  console.log(pathName && dynamicPaths[pathName], id)
  const page = useCMSPage((pathName && dynamicPaths[pathName]) || id)
  const {templates} = useCMSContext()

  const isDynamic = pathName && Object.keys(dynamicPaths).includes(pathName)

  const findTemplate = (name: string) => {
    const template = templates.find(t => t.TemplateName === name)

    if (!template) {
      throw new Error(`Template "${name}" not found`)
    }

    return template
  }

  const Template = page.template ? findTemplate(page.template) : null

  return (
    <TemplateContext.Provider value={{pageId: id, page}}>
      {isDynamic && Template ? <Template /> : children}
    </TemplateContext.Provider>
  )
}

export default withRedux(TemplateProvider)
