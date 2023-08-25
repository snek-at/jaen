import {useColorModeValue, useToken} from '@chakra-ui/react'
import {useEffect, useRef} from 'react'

import {darkTheme, GraphCanvas, lightTheme, useSelection} from 'reagraph'
import {convertTreeToGraph, TreeNode} from './convert-tree-to-graph'

export const Graph: React.FC<{
  tree: TreeNode[]
  selection?: string
  onSelect: (id: string) => void
}> = ({tree, selection, onSelect}) => {
  const data = convertTreeToGraph(tree)

  const graphRef = useRef(null)
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
        // setSelections(selection ? [selection] : [])
      }
    }
    // selections: selection ? [selection] : []
  })

  useEffect(() => {
    setSelections(selection ? [selection] : [])
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
      ref={graphRef}
      theme={theme}
      nodes={data.nodes}
      edges={data.edges}
      selections={selections}
      actives={actives}
      onNodePointerOver={onNodePointerOver}
      onNodePointerOut={onNodePointerOut}
      onCanvasClick={onCanvasClick}
      onNodeClick={onNodeClick}
    />
  )
}
