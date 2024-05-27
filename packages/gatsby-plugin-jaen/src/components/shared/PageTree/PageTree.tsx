import {
  Box,
  Text,
  useColorModeValue,
  useTheme,
  useToken
} from '@chakra-ui/react'
import {mode, transparentize} from '@chakra-ui/theme-tools'

import {useEffect, useState} from 'react'
import {
  StaticTreeDataProvider,
  Tree,
  ControlledTreeEnvironment,
  TreeItemIndex,
  TreeItem
} from 'react-complex-tree'

import 'react-complex-tree/lib/style-modern.css'
import {convertTreeToPageTree, TreeNode} from './convert-tree-to-page-tree'

export interface PageTreeProps {
  tree: TreeNode[]
  defaultSelected?: string
  onSelected: (id: string, item: TreeItem) => void
}

export const PageTree: React.FC<PageTreeProps> = ({
  tree,
  defaultSelected,
  onSelected
}) => {
  const pageTree = convertTreeToPageTree(tree)

  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>()

  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([
    'root',
    'JaenPage /'
  ])
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([])

  useEffect(() => {
    setSelectedItems(defaultSelected ? [defaultSelected] : [])
  }, [defaultSelected])

  const theme = useTheme()

  const darkHoverBg = transparentize(`brand.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`brand.200`, 0.24)(theme)

  const [brand50, brand100] = useToken('colors', ['brand.50', 'brand.100'])

  const hoverBg = useColorModeValue(brand50, darkHoverBg)
  const activeBg = useColorModeValue(brand100, darkActiveBg)

  const selectedBg = useColorModeValue('transparent', activeBg)

  const color = useColorModeValue('gray.700', 'gray.200')

  return (
    <ControlledTreeEnvironment
      items={pageTree.items}
      getItemTitle={item => item.data}
      viewState={{
        'tree-1': {
          expandedItems,
          selectedItems,
          focusedItem
        }
      }}
      renderTreeContainer={props => (
        <Box
          w="full"
          className="tree"
          sx={{
            '--rct-bar-color': 'var(--chakra-colors-brand-500)',
            '--rct-color-drag-between-line-bg':
              'var(--chakra-colors-brand-500)',

            '--rct-item-height': '2rem',
            '--rct-color-focustree-item-hover-bg': hoverBg,

            '--rct-color-focustree-item-selected-bg': selectedBg,
            '--rct-color-focustree-item-active-bg': activeBg,

            '--rct-color-arrow': 'var(--chakra-colors-brand-500)'
          }}>
          <ul className="tree-root tree-node-list" {...props.containerProps}>
            {props.children}
          </ul>
        </Box>
      )}
      renderItemTitle={props => {
        return (
          <Text fontSize="sm" color={color}>
            {props.title}
          </Text>
        )
      }}
      canDropAt={(items, target) => {
        return true
      }}
      onFocusItem={item => setFocusedItem(item.index)}
      onExpandItem={item => {
        setExpandedItems([...expandedItems, item.index])
      }}
      onCollapseItem={item => {
        if (item.index === 'root' || item.index === 'JaenPage /') return

        setExpandedItems(
          expandedItems.filter(
            expandedItemIndex => expandedItemIndex !== item.index
          )
        )
      }}
      onSelectItems={items => {
        setSelectedItems(items)

        const first = items[0]

        if (first) {
          const node = pageTree.items[first]

          if (!node) return

          onSelected(first.toString(), node)
        }
      }}
      canDragAndDrop
      canDropOnFolder
      canReorderItems={false}>
      <Tree treeId="tree-1" rootItem="root" treeLabel="Pages" />
    </ControlledTreeEnvironment>
  )
}
