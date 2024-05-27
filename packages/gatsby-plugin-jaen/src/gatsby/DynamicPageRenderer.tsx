import {PageProps, PageProvider, useDynamicPaths, withRedux} from '@atsnek/jaen'

import React, {lazy, useEffect, useMemo} from 'react'
import {useJaenPagePaths} from './jaen-page-paths'

export interface DynamicPageRendererProps extends Omit<PageProps, 'children'> {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  Component: React.ComponentType<any>
}

export const DynamicPageRenderer: React.FC<DynamicPageRendererProps> =
  withRedux(({Component, ...props}) => {
    const allJaenPagePaths = useJaenPagePaths() // Replace this with the actual hook you're using

    const paths = useDynamicPaths({
      staticPages: allJaenPagePaths.allJaenPage.nodes
    }) // Replace this with the actual hook you're using

    const pathWithTrailingSlash = props.location.pathname.endsWith('/')
      ? props.location.pathname
      : props.location.pathname + '/'

    const dynamicJaenPage = paths[pathWithTrailingSlash]

    const dynamic = useMemo(() => {
      if (!dynamicJaenPage) return null

      const relativePath = allJaenPagePaths.allJaenTemplate.nodes.find(
        node => node.id === dynamicJaenPage.jaenTemplateId
      )?.relativePath

      return {
        jaenPageId: dynamicJaenPage.jaenPageId,
        Component: lazy(
          () => import(`${__JAEN_SOURCE_TEMPLATES__}/${relativePath}`)
        )
      }
    }, [dynamicJaenPage])

    if (dynamicJaenPage?.isDeleted) {
      return (
        <Component {...props}>
          <div>Page not found</div>
        </Component>
      )
    }

    if (dynamic) {
      return (
        <PageProvider jaenPage={{id: dynamic.jaenPageId}}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Component
              {...props}
              pageContext={{
                ...props.pageContext,
                jaenPageId: dynamic.jaenPageId
              }}>
              <dynamic.Component
                {...{
                  pageContext: {
                    jaenPageId: dynamic.jaenPageId
                  }
                }}
              />
            </Component>
          </React.Suspense>
        </PageProvider>
      )
    }

    if (props.pageContext.jaenPageId) {
      return (
        <PageProvider
          jaenPage={{
            id: props.pageContext.jaenPageId,
            ...props.data?.jaenPage
          }}
          jaenPages={props.data?.allJaenPage?.nodes || []}>
          <Component {...props} />
        </PageProvider>
      )
    }

    return <Component {...props} />
  })
