// interface PageTreeNode {
//   index: string
//   canMove: boolean
//   isFolder: boolean
//   children?: string[]
//   data: string
//   canRename: boolean
// }

import {TreeItem} from 'react-complex-tree'

export interface TreeNode {
  id: string
  label: string
  children: TreeNode[]
}

export interface PageTreeData {
  items: {[key: string]: TreeItem}
}

export function convertTreeToPageTree(tree: TreeNode[]): PageTreeData {
  const pageTreeData: PageTreeData = {
    items: {
      root: {
        index: 'root',
        canMove: false,
        canRename: false,
        isFolder: true,
        children: tree.map(child => child.id),
        data: 'root'
      }
    }
  }

  function traverse(node: TreeNode): TreeItem {
    const isFolder = node.children.length > 0
    const children = isFolder
      ? node.children.map(child => traverse(child))
      : undefined

    const pageNode = {
      index: node.id,
      canMove: false,
      isFolder: isFolder,
      children: children?.map(child => child.index),
      data: node.label,
      canRename: false,
      isExpanded: true
    }

    pageTreeData.items[node.id] = pageNode

    return pageNode
  }

  tree.forEach(node => {
    traverse(node)
  })

  return pageTreeData
}
