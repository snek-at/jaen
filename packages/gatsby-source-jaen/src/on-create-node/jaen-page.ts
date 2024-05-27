import {CreateNodeArgs} from 'gatsby'

export const onCreateNode = async ({
  node,
  actions,
  getNode
}: CreateNodeArgs) => {
  // if (node.internal.type === 'JaenPage') {
  //   const parentPageNode = node.parentPage ? getNode(node.parentPage) : null
  //   if (node && parentPageNode) {
  //     // console.log(
  //     //   `onCreateNode Creating parent-child link between`,
  //     //   node.id,
  //     //   parentPageNode.id
  //     // )
  //     // actions.createParentChildLink({
  //     //   parentPage: parentPageNode,
  //     //   child: node
  //     // })
  //   }
  // }
}
