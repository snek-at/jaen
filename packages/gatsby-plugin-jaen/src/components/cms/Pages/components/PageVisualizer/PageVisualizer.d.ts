import {TreeNode} from './convert-tree-to-graph'

export function PageVisualizer(props: {
  tree: TreeNode[]
  selection?: string
  onSelect?: (id: string) => void
}): any
