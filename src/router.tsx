import React, {useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  BrowserRouterProps,
  Route,
  Switch
} from 'react-router-dom'

import {RootState} from '~/store/store'

import {SkeletonPageType, SkeletonPageProps} from './components/pages/index'
import {CMSContext} from './context'

type PageRouterProps = {
  pages: SkeletonPageType[]
} & BrowserRouterProps

const PageRouter: React.FC<PageRouterProps> = ({
  pages,
  ...props
}): JSX.Element => {
  const context = useContext(CMSContext)
  const index = useSelector((state: RootState) => state.cms.index)

  useEffect(() => context?.setRegisteredPages(pages))

  if (!index) return <></>

  const findPageComponent = (typeName: string) =>
    pages.find(page => page.PageType === typeName)

  const Page: React.FC<SkeletonPageProps> = props => {
    const {typeName} = props
    const PageComponent = findPageComponent(typeName)

    if (PageComponent) {
      return <PageComponent {...props} />
    } else {
      return <p>404 Not found</p>
    }
  }

  const generateRoutes = () => {
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

    const pages = index.pages

    const travelIndexTree = (page: typeof index.pages[string], path = '/') => {
      const {typeName, slug, childSlugs} = page

      routes.push(generateRoute(typeName, slug, path, routes.length))

      childSlugs.forEach(childSlug => {
        travelIndexTree(pages[childSlug], path + `${childSlug}/`)
      })
    }

    const rootPage = pages[index.rootPageSlug]

    travelIndexTree(rootPage)

    return routes
  }

  const routes = generateRoutes()

  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Switch>
        {props.children}
        {routes}
        <Route component={() => <div>404 Not found </div>} />
      </Switch>
    </Router>
  )
}

export default PageRouter
