import {TreeData, TreeItem} from '@atlaskit/tree'

import type {Items} from './index'

export const TreeConverter = (items: Items): TreeData => {
  const rootName = 'SitePage'
  const tree: TreeData = {
    rootId: rootName,
    items: {
      [rootName]: {
        id: rootName,
        children: []
      }
    }
  }

  function nth<T>(iter: Iterable<T>, n: number) {
    for (const v of iter) if (--n < 0) return v
  }

  function* genItemParent(
    allItems: Items,
    rootItemId: string
  ): Generator<string> {
    let parent = allItems[rootItemId].parent

    while (parent) {
      yield parent

      parent = allItems[parent].parent
    }
  }

  function* genTreeItems(tree: TreeData, items: Items): Generator<TreeItem> {
    for (const [id, item] of Object.entries(items)) {
      if (item.parent === null) {
        tree.items[rootName].children.push(id)
      }

      // if (item.deleted) {
      //   return
      // }

      const parentIter = genItemParent(items, id)
      const isExpanded = !nth(parentIter, 3)

      yield {
        ...item,
        id,
        hasChildren: !!item.children.length,
        isExpanded,
        isChildrenLoading: false
      }
    }
  }

  for (const item of genTreeItems(tree, items)) {
    tree.items[item.id] = item
  }

  return tree
}

export const resolveChildSlugs = (
  items: Items,
  rootItemIds: string[],
  id: string | null
): string[] => {
  const children = id ? items[id].children : rootItemIds

  const childSlugs = []

  for (const childId of children) {
    const child = items[childId]

    if (child) {
      const slug = child.data?.slug

      if (!child.deleted && slug) {
        childSlugs.push(slug)
      }
    }
  }

  return childSlugs
}

export const titleToSlug = (title: string): string => {
  return title.trim().toLowerCase().replace(/ +/g, '-')
}
