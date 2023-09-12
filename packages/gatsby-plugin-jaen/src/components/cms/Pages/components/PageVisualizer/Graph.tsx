import {useColorModeValue, useToken} from '@chakra-ui/react'
import {useEffect, useRef} from 'react'

import {
  darkTheme,
  GraphCanvas,
  GraphCanvasRef,
  lightTheme,
  useSelection
} from 'reagraph'
import {convertTreeToGraph, TreeNode} from './convert-tree-to-graph'

export const Graph: React.FC<{
  tree: TreeNode[]
  selection?: string
  onSelect: (id: string) => void
}> = ({tree, selection, onSelect}) => {
  const data = convertTreeToGraph(tree)

  const graphRef = useRef<GraphCanvasRef>(null)
  const {
    selections,
    actives,
    onNodeClick,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut,
    setSelections
  } = useSelection({
    ref: graphRef,
    nodes: data.nodes,
    edges: data.edges,
    pathHoverType: 'out',
    pathSelectionType: 'out',
    focusOnSelect: true,
    onSelection: selections => {
      const selection = selections[0]

      if (selection) {
        onSelect(selection)
      } else {
        onSelect('')
      }
    }
  })

  useEffect(() => {
    // check if selection is in the graph
    const selectionExists = data.nodes.find(node => node.id === selection)

    if (selectionExists) {
      setSelections(selection ? [selection] : [])

      graphRef.current?.centerGraph(selection ? [selection] : [])
    }
  }, [selection])

  const [brand500] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['brand.500']
    // a single fallback or fallback array matching the length of the previous arg
  )

  const theme = useColorModeValue(
    {
      ...lightTheme,
      node: {
        ...lightTheme.node,
        activeFill: brand500,
        label: {
          ...lightTheme.node.label,
          activeColor: brand500
        }
      },
      ring: {
        ...lightTheme.ring,
        activeFill: brand500
      },
      edge: {
        ...lightTheme.edge,
        activeFill: brand500,
        label: {
          ...lightTheme.edge.label,
          stroke: lightTheme.canvas.background,
          activeColor: brand500
        }
      },
      arrow: {
        ...lightTheme.arrow,
        activeFill: brand500
      },
      cluster: {
        ...lightTheme.cluster
      }
    },

    {
      ...darkTheme,
      node: {
        ...darkTheme.node,
        activeFill: brand500,
        label: {
          ...darkTheme.node.label,
          stroke: darkTheme.canvas.background,
          activeColor: brand500
        }
      },
      ring: {
        ...darkTheme.ring,
        activeFill: brand500
      },
      edge: {
        ...darkTheme.edge,
        activeFill: brand500,
        label: {
          ...darkTheme.edge.label,
          activeColor: brand500
        }
      },
      arrow: {
        ...darkTheme.arrow,
        activeFill: brand500
      },
      cluster: {
        ...darkTheme.cluster
      }
    }
  )

  return (
    <GraphCanvas
      key={theme.canvas.background}
      selections={selections}
      actives={actives}
      onCanvasClick={onCanvasClick}
      onNodeClick={onNodeClick}
      onNodePointerOver={onNodePointerOver}
      onNodePointerOut={onNodePointerOut}
      ref={graphRef}
      layoutType="hierarchicalTd"
      theme={theme}
      nodes={data.nodes}
      edges={data.edges}
      sizingType="centrality"
    />
  )
}
