import {
  BrowserRouter as Router,
  BrowserRouterProps,
  Route,
  Switch
} from 'react-router-dom'
import {store as storeTypes, ConnectedPageType} from '~/types'

import {useCMSContext} from './contexts/context'
import PageProvider from './contexts/pageProvider'

export const generateRoutes = (
  registeredPages: ConnectedPageType[],
  rootPageSlug: string,
  pagesDetails: storeTypes.PagesDetails
) => {
  const findPageComponent = (typeName: string) =>
    registeredPages.find(page => page.PageType === typeName)

  const Page: React.FC<{typeName: string}> = props => {
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
      render={props => (
        <PageProvider typeName={typeName} slug={slug}>
          <Page typeName={typeName} {...props} />
        </PageProvider>
      )}
      key={key}
    />
  )

  const routes: JSX.Element[] = []

  const travelIndexTree = (page: typeof pagesDetails[string], path = '/') => {
    const {typeName, slug, childSlugs, deleted} = page

    !deleted && routes.push(generateRoute(typeName, slug, path, routes.length))

    childSlugs.forEach(childSlug => {
      travelIndexTree(pagesDetails[childSlug], path + `${childSlug}/`)
    })
  }

  if (pagesDetails) {
    const rootPage = pagesDetails[rootPageSlug]

    rootPage && travelIndexTree(rootPage)
  }

  return routes
}

type PageRouterProps = {} & BrowserRouterProps

const PageRouter: React.FC<PageRouterProps> = ({children}): JSX.Element => {
  const {registeredPages, rootPageSlug, pagesDetails} = useCMSContext()

  return (
    <Router>
      <Switch>
        {generateRoutes(registeredPages, rootPageSlug, pagesDetails)}
      </Switch>
      {children}
    </Router>
  )
}

export default PageRouter
