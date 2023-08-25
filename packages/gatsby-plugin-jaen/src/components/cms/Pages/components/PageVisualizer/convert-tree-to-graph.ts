interface GraphNode {
  id: string
  label: string
}

interface Edge {
  id: string
  source: string
  target: string
  label: string
}

export interface GraphData {
  nodes: GraphNode[]
  edges: Edge[]
}

export interface TreeNode {
  id: string
  label: string
  children: TreeNode[]
}

export function convertTreeToGraph(tree: TreeNode[]): GraphData {
  const nodes: GraphNode[] = []
  const edges: Edge[] = []

  function traverse(node: TreeNode) {
    // Add the current node to the nodes array
    nodes.push({id: node.id, label: node.label})

    // Process children of the current node
    for (const child of node.children) {
      // Add an edge from the current node to its child
      edges.push({
        id: `${node.id}->${child.id}`,
        source: node.id,
        target: child.id,
        label: '' // You can set an appropriate label here if needed
      })

      // Recursively traverse the child node and its descendants
      traverse(child)
    }
  }

  // Start traversing from the root of the tree
  for (const root of tree) {
    traverse(root)
  }

  return {nodes, edges}
}
