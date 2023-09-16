import {MediaNode} from '@atsnek/jaen'
import {Node, SourceNodesArgs} from 'gatsby'
import {createRemoteFileNode} from 'gatsby-source-filesystem'
import {getLastPartOfId} from '../utils/get-last-part-of-id'

import {JaenData} from './jaen-data'

export const sourceNodes = async (args: SourceNodesArgs) => {
  const {actions, createContentDigest, getNodesByType} = args
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

  const jaenPages = jaenData.pages || []

  for (const page of jaenPages) {
    // const page = await processPage({
    //   page: dataPage
    // })

    if (page.id === 'JaenPage /cms/media/') {
      // Process media and create nodes

      const nodes: {
        [mediaId: string]: MediaNode
      } = page.jaenFields?.['IMA:MEDIA_NODES']?.['media_nodes']?.value || {}

      for (const [mediaId, node] of Object.entries(nodes)) {
        const fileNode = await createRemoteFileNode({
          url: node.url,
          parentNodeId: node.id,
          createNode,
          ...args
        })

        const data = {
          id: mediaId,
          jaenPageId: node.jaenPageId,
          description: node.description,
          node: fileNode.id
        }

        const mediaNode = {
          ...data,
          internal: {
            type: 'MediaNode',
            contentDigest: createContentDigest(data)
          }
        }

        await createNode(mediaNode)
      }
    }

    let slug = page.slug
    if (!slug) {
      slug = getLastPartOfId(page.id) || 'root'
    }

    const pageWithSlug = {
      ...page,
      slug,
      parentPage: page.parentPage?.id,
      childPages: page.childPages?.map(child => child.id) || [],
      childTemplates: page.childTemplates || [],
      jaenPageMetadata: {
        ...page.jaenPageMetadata,
        title: page.jaenPageMetadata?.title || slug
      }
    }

    const pageNode = {
      ...pageWithSlug,
      // parentPage: pageWithSlug.parentPage?.id,
      // children: pageWithSlug.children?.map(child => child.id) || [],
      parent: null,
      children: [],
      internal: {
        type: 'JaenPage',
        content: JSON.stringify(pageWithSlug),
        contentDigest: createContentDigest(pageWithSlug)
      }
    }

    await createNode(pageNode)
  }
}
