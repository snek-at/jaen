import {PageConfig} from '@atsnek/jaen'
import {CreatePageArgs, Node} from 'gatsby'

import {getJaenPageParentId} from '../utils/get-jaen-page-parent-id'
import {readPageConfig} from '../utils/page-config-reader'

export const onCreatePage = async ({
  actions,
  page,
  getNode,
  createContentDigest
}: CreatePageArgs) => {
  let jaenPageId = page.context?.jaenPageId as string | undefined
  let pageConfig = page.context?.pageConfig as PageConfig | undefined

  if (!jaenPageId) {
    jaenPageId = `JaenPage ${page.path}`
    pageConfig = readPageConfig(page.component)

    actions.deletePage(page)

    actions.createPage({
      ...page,
      context: {
        ...page.context,
        jaenPageId,
        pageConfig
      }
    })
  }

  // Find the JaenPage node with the same id
  const jaenPageNode = getNode(jaenPageId) as Node | undefined

  const path = page.path.replace(/\/+$/, '') // Remove trailing slashes from the path
  const lastPathElement = path.split('/').pop() || '' // Extract the last element

  const newJaenPageNode = {
    id: jaenPageId,
    slug: lastPathElement,

    jaenPageMetadata: {
      title:
        pageConfig?.label ||
        lastPathElement.charAt(0).toUpperCase() + lastPathElement.slice(1)
    },
    jaenFields: null,
    sections: [],
    template: null,
    ...jaenPageNode,
    parentPage: getJaenPageParentId({
      parentPage: jaenPageNode?.parentPage
        ? {id: jaenPageNode.parentPage as string}
        : null,
      id: jaenPageId
    }),
    childPages: jaenPageNode?.childPages || [],
    pageConfig
  }

  const node = {
    ...newJaenPageNode,
    internal: {
      type: 'JaenPage',
      contentDigest: createContentDigest(newJaenPageNode),
      content: JSON.stringify(newJaenPageNode)
    }
  }

  await actions.createNode(node)
}
