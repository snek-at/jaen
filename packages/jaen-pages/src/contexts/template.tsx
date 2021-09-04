import {createContext, useContext} from 'react'
import {useSelector} from 'react-redux'

import {useAppSelector} from '../store'
import {withRedux} from '../store/withRedux'
import {PageType, ResolvedPageType} from '../types'
import {useCMSContext, useCMSPage} from './cms'

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

  const dynamicPaths = useAppSelector(({site}) => site.routing.dynamicPaths)

  const page = useCMSPage(
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

  const Template = page.template ? findTemplate(page.template) : null

  if (isDynamic) {
    jaenPageContext.id = dynamicPaths[pathName]
  }

  return (
    <TemplateContext.Provider value={{jaenPageContext, page}}>
      {isDynamic && Template ? <Template /> : children}
    </TemplateContext.Provider>
  )
}

export default withRedux(TemplateProvider)
