/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {GlobalOutlined, CarryOutOutlined} from '@ant-design/icons'
import {TreeDataNode} from 'antd'
import {ConnectedPageType} from '~/contexts'

import {ExplorerTDN} from '~/components/Explorer'

import {store as storeTypes, components as componentsTypes} from '../types'

// import * as React from 'react'

export type IndexKeyRefs = {[key: string]: storeTypes.PageDetails}
export type ChildPageTypeNamesKeyRefs = {[key: string]: string[] | undefined}

export const buildPageTree = (
  pagesDetails: storeTypes.PagesDetails,
  rootPageSlug: string,
  registeredPages: ConnectedPageType[]
): {
  treeData: ExplorerTDN[]
  indexKeyRefs: IndexKeyRefs
  childPageTypeNamesKeyRefs: ChildPageTypeNamesKeyRefs
} => {
  const getChildPageTypeNames = (typeName: string): string[] | undefined =>
    registeredPages
      .find(page => page.PageType === typeName)
      ?.ChildPages.map(page => page.PageType)

  const transformNode = (
    page: storeTypes.PageDetails,
    buildTree: componentsTypes.ExplorerTDN = {
      key: '/',
      title: (
        <>
          {page.title} <GlobalOutlined />
        </>
      ),
      icon: <CarryOutOutlined />,
      children: []
    }
  ): TreeDataNode => {
    for (const childSlug of page.childSlugs) {
      const childPage = pagesDetails[childSlug]

      if (childPage) {
        const {title, typeName, deleted} = childPage
        const key = `${buildTree.key}${childSlug}/`

        indexKeyRefs[key] = childPage
        childPageTypeNamesKeyRefs[key] = getChildPageTypeNames(typeName)

        !deleted &&
          buildTree.children?.push(
            transformNode(childPage, {
              key,
              title,
              icon: <CarryOutOutlined />,
              children: []
            })
          )
      }
    }

    return buildTree
  }

  const rootPage = pagesDetails[rootPageSlug]

  let treeData
  const indexKeyRefs: IndexKeyRefs = {}
  const childPageTypeNamesKeyRefs: ChildPageTypeNamesKeyRefs = {}

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
