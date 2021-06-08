import React from 'react'
import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  BrowserRouterProps,
  Route
} from 'react-router-dom'

import {RootState} from '~/store/store'

import {SkeletonPageType, SkeletonPageProps} from './components/pages/index'

type PageRouterProps = {
  pages: SkeletonPageType[]
} & BrowserRouterProps

const PageRouter: React.FC<PageRouterProps> = ({
  pages,
  ...props
}): JSX.Element => {
  const tree = useSelector((state: RootState) => state.cms.index?.tree)

  if (!tree) return <></>

  const findPageComponent = (typeName: string) =>
    pages.find(page => page.PageType === typeName)

  const Page: React.FC<SkeletonPageProps> = props => {
    const {typeName} = props
    const PageComponent = findPageComponent(typeName)

    if (PageComponent) {
      return <PageComponent {...props} />
    } else {
      return <p>404 page not found</p>
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

    const travelIndexTree = (node: typeof tree, path = '/') => {
      console.log(node, path)
      routes.push(
        generateRoute(node.fields.type, node.fields.slug, path, routes.length)
      )

      node.nodes.forEach(childNode => {
        travelIndexTree(childNode, (path += `${childNode.fields.slug}/`))
      })
    }

    travelIndexTree(tree)

    return routes
  }

  const routes = generateRoutes()

  return (
    <Router>
      {props.children}
      {routes}
    </Router>
  )
}

export default PageRouter
