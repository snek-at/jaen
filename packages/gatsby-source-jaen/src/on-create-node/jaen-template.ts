import {CreateNodeArgs} from 'gatsby'
import {readPageConfig} from '../utils/page-config-reader'

export const onCreateNode = async ({
  node,
  actions,
  createContentDigest
}: CreateNodeArgs) => {
  // Check if the node is a File node of instance `templates`
  if (
    node.internal.type === 'File' &&
    node.sourceInstanceName === 'templates'
  ) {
    const name = node.name as string
    const absolutePath = node.absolutePath as string
    const relativePath = node.relativePath as string

    const pageConfig = readPageConfig(absolutePath)

    const templateNode = {
      id: `JaenTemplate ${name}`, // id must be unique across all nodes
      absolutePath: absolutePath,
      relativePath: relativePath,
      label: pageConfig?.label || name,
      childTemplates: pageConfig?.childTemplates || []
    }

    // Create link to other templates

    actions.createNode({
      ...templateNode,
      parent: node.id,
      internal: {
        type: 'JaenTemplate',
        content: JSON.stringify(templateNode),
        contentDigest: createContentDigest(templateNode)
      }
    })
  }
}
