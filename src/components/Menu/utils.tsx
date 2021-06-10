import {GlobalOutlined, CarryOutOutlined} from '@ant-design/icons'

// import * as React from 'react'
import {CMSContextType} from '../../context'
import {PageIndex} from '../../store/types'
import {ExplorerTDN} from '../Explorer/index'

// Stupid workaround

export type IndexKeyRefs = {[key: string]: PageIndex['pages'][string]}
export type ChildPageTypeNamesKeyRefs = {[key: string]: string[] | undefined}

export const transformIndexTree = (
  index: PageIndex,
  cmsContext: CMSContextType
) => {
  const getChildPageTypeNames = (typeName: string) =>
    cmsContext
      ?.getRegisteredPage(typeName)
      ?.ChildPages.map(page => page.PageType)

  const pages = index.pages
  const rootPage = pages[index.rootPageSlug]

  const indexKeyRefs: IndexKeyRefs = {
    '/': rootPage
  }
  const childPageTypeNamesKeyRefs: ChildPageTypeNamesKeyRefs = {
    '/': getChildPageTypeNames(rootPage.typeName)
  }

  const transformNode = (
    page: PageIndex['pages'][string],
    buildTree: ExplorerTDN = {
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

  const treeData = transformNode(rootPage)

  return {treeData: [treeData], indexKeyRefs, childPageTypeNamesKeyRefs}
}
