/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  BrowserRouter as Router,
  BrowserRouterProps,
  Route,
  Switch
} from 'react-router-dom'
import {ConnectedPageType} from '~/types'

import {useCMSContext} from './contexts/context'
import PageProvider from './contexts/pageProvider'
import {PagesDetails} from './store/types/cms/dataLayer'

export const generateRoutes = (
  registeredPages: ConnectedPageType[],
  rootPageSlug: string,
  pagesDetails: PagesDetails
): JSX.Element[] => {
  const findPageComponent = (typeName: string): ConnectedPageType | undefined =>
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
  ): JSX.Element => (
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

  const travelIndexTree = (
    page: typeof pagesDetails[string],
    path = '/'
  ): void => {
    const {typeName, slug, childSlugs, deleted} = page

    !deleted && routes.push(generateRoute(typeName, slug, path, routes.length))

    for (const childSlug of childSlugs) {
      travelIndexTree(pagesDetails[childSlug], `${path}${childSlug}/`)
    }
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
