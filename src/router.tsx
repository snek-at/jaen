import {Spin, Row} from 'antd'
import React from 'react'
import {
  BrowserRouter as Router,
  BrowserRouterProps,
  Route,
  Switch
} from 'react-router-dom'
import {ConnectedPageType, PageParamsType} from '~/types'

import {useCMSContext} from './contexts/context'
import {PageIndex} from './store/types'

export const generateRoutes = (
  registeredPages: ConnectedPageType[],
  index: PageIndex
) => {
  const pages = index.pages

  const findPageComponent = (typeName: string) =>
    registeredPages.find(page => page.PageType === typeName)

  const Page: React.FC<PageParamsType & {typeName: string}> = props => {
    const {typeName} = props
    const PageComponent = findPageComponent(typeName)

    if (PageComponent) {
      return <PageComponent {...props} />
    } else {
      return <p>404 Not found</p>
    }
  }

  const generateRoute = (
    typeName: string,
    slug: string,
    path = '/',
    key = 0
  ) => (
    <Route
      exact
      path={path}
      render={props => <Page typeName={typeName} slug={slug} {...props} />}
      key={key}
    />
  )

  const routes: JSX.Element[] = []

  const travelIndexTree = (page: typeof index.pages[string], path = '/') => {
    const {typeName, slug, childSlugs} = page

    routes.push(generateRoute(typeName, slug, path, routes.length))

    childSlugs.forEach(childSlug => {
      travelIndexTree(pages[childSlug], path + `${childSlug}/`)
    })
  }

  if (pages) {
    const rootPage = index.rootPageSlug && pages[index.rootPageSlug]

    rootPage && travelIndexTree(rootPage)
  }

  return routes
}

type PageRouterProps = {} & BrowserRouterProps

const PageRouter: React.FC<PageRouterProps> = ({children}): JSX.Element => {
  const {index, registeredPages} = useCMSContext()

  return (
    <Router>
      <Switch>
        {index && generateRoutes(registeredPages, index)}
        <Route
          component={() =>
            !index || !index.pages ? (
              <Row justify={'center'}>
                <Spin size="large" />
              </Row>
            ) : (
              <div>404 Not found </div>
            )
          }
        />
      </Switch>
      {children}
    </Router>
  )
}

export default PageRouter
