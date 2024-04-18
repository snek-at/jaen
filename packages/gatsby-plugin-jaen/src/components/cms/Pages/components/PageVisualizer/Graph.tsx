import {useToken} from '@chakra-ui/react'
import {useEffect, useMemo, useRef} from 'react'

import {GraphCanvas, GraphCanvasRef, useSelection} from 'reagraph'
import {TreeNode, convertTreeToGraph} from './convert-tree-to-graph'

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

  const theme = useMemo(
    () => ({
      canvas: {background: '#fff'},
      node: {
        fill: '#7CA0AB',
        activeFill: brand500,
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 1,
        label: {
          color: '#2A6475',
          stroke: '#fff',
          activeColor: brand500
        },
        subLabel: {
          color: '#ddd',
          stroke: 'transparent',
          activeColor: brand500
        }
      },
      lasso: {
        border: '1px solid #55aaff',
        background: 'rgba(75, 160, 255, 0.1)'
      },
      ring: {
        fill: '#D8E6EA',
        activeFill: brand500
      },
      edge: {
        fill: '#D8E6EA',
        activeFill: brand500,
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 1,
        label: {
          stroke: '#fff',
          color: '#2A6475',
          activeColor: brand500,
          fontSize: 6
        }
      },
      arrow: {
        fill: '#D8E6EA',
        activeFill: brand500
      },
      cluster: {
        stroke: '#D8E6EA',
        opacity: 1,
        selectedOpacity: 1,
        inactiveOpacity: 1,
        label: {
          stroke: '#fff',
          color: '#2A6475'
        }
      }
    }),
    [brand500]
  )

  return (
    <GraphCanvas
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
