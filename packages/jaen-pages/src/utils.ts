import {DynamicPaths, ResolveDynamicPaths, SitePages} from './types'

export const resolvePath = (id: string, nodes: SitePages['nodes']) => {
  const resolve = (cId: string, path = ''): string => {
    const node = nodes[cId]

    const parentId = node.parent?.id
    const parent = parentId && nodes[parentId]

    const newPath = node.slug + '/' + path

    if (parentId && parent) {
      return resolve(parentId, newPath)
    } else {
      return newPath
    }
  }

  return `/${resolve(id)}`
}

export const resolveDynamicPath: ResolveDynamicPaths = (
  baseId: string,
  sitePages: SitePages
) => {
  const nodes = sitePages.nodes
  const dynamicPaths: DynamicPaths = {}
  const affectedIds: string[] = []
  const basePath = resolvePath(baseId, nodes)

  alert(`baseId: ${baseId} basePath: ${basePath}`)

  const resolveNode = (id: string, prevPath = basePath) => {
    alert(`resolve ${id} path: ${prevPath}`)

    dynamicPaths[prevPath] = id
    affectedIds.push(id)

    const children = nodes[id].children

    for (const child of children) {
      const path = `${prevPath}${nodes[child.id].slug}`

      resolveNode(child.id, path)
    }
  }

  resolveNode(baseId)

  return {dynamicPaths, affectedIds}
}

