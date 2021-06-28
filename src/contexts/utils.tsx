import {GlobalOutlined, CarryOutOutlined} from '@ant-design/icons'
import {store} from '~/types'
import {components} from '~/types'

// import * as React from 'react'

export type IndexKeyRefs = {[key: string]: store.PageIndex['pages'][string]}
export type ChildPageTypeNamesKeyRefs = {[key: string]: string[] | undefined}

export const transformIndexTree = (
  index: store.PageIndex,
  getChildPageTypeNames: (typeName: string) => string[] | undefined
) => {
  const transformNode = (
    page: store.PageIndex['pages'][string],
    buildTree: components.ExplorerTDN = {
      key: '/',
      title: (
        <>
          {page.title} <GlobalOutlined />
        </>
      ),
      icon: <CarryOutOutlined />,
      children: []
    }
  ) => {
    page.childSlugs.forEach(childSlug => {
      const childPage = pages[childSlug]

      if (childPage) {
        const {title, typeName} = childPage
        const key = `${buildTree.key + childSlug}/`

        indexKeyRefs[key] = childPage
        childPageTypeNamesKeyRefs[key] = getChildPageTypeNames(typeName)

        buildTree.children?.push(
          transformNode(childPage, {
            key,
            title,
            icon: <CarryOutOutlined />,
            children: []
          })
        )
      }
    })

    return buildTree
  }

  const pages = index.pages
  const rootPage = index.rootPageSlug && pages[index.rootPageSlug]

  let treeData
  let indexKeyRefs: IndexKeyRefs = {}
  let childPageTypeNamesKeyRefs: ChildPageTypeNamesKeyRefs = {}

  if (rootPage) {
    indexKeyRefs['/'] = rootPage
    childPageTypeNamesKeyRefs['/'] = getChildPageTypeNames(rootPage.typeName)

    treeData = transformNode(rootPage)
  }
  return {
    treeData: treeData ? [treeData] : [],
    indexKeyRefs,
    childPageTypeNamesKeyRefs
  }
}
