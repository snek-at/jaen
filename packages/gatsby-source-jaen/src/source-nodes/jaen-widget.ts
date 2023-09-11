import {Node, SourceNodesArgs} from 'gatsby'

import {JaenData} from './jaen-data'

export const sourceNodes = async (args: SourceNodesArgs) => {
  const {actions, createNodeId, createContentDigest, reporter, getNodesByType} =
    args
  const {createNode} = actions

  const jaenDataNodes = getNodesByType('JaenData')

  if (jaenDataNodes.length === 0) {
    // error that points out that jaen-data source-nodes must be called beforehand

    return
  }

  if (jaenDataNodes.length > 1) {
    // error that points out that there are more than one jaen data node and this is wrong
    return
  }

  const jaenData = jaenDataNodes[0] as Node & JaenData

  const jaenWidgets = jaenData.widgets

  if (!jaenWidgets) {
    return
  }

  for (const widget of jaenWidgets) {
    const node = {
      internal: {
        type: 'JaenWidget',
        contentDigest: createContentDigest(widget)
      },
      ...widget,
      id: createNodeId(`JaenWidget-${widget.name}`)
    }

    createNode(node)
  }
}
