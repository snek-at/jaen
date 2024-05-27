import {JaenPage} from '../types'

export interface PageNode {
  id: string
  slug: string
  parentPage: {
    id: string
  } | null
}

export const generatePageOriginPath = (
  allNodes: PageNode[],
  node: PageNode,
  path = node.id === 'JaenPage /' ? '/' : `/${node.slug}`
): string | undefined => {
  const parentId = node.parentPage?.id
  const parent = allNodes.find(n => n.id === parentId)

  if (parent) {
    let slug = path

    if (parent.slug) {
      if (parent.slug !== 'root') {
        slug = `/${parent.slug}${path}`
      }
    }

    return generatePageOriginPath(allNodes, parent, slug)
  }

  // with trailing slash
  const normalizedPath = path.endsWith('/') ? path : `${path}/`

  return normalizedPath
}

export const generatePagePaths = (allNodes: JaenPage[], pageId: string) => {
  const originNode = allNodes.find(node => node.id === pageId)

  if (originNode) {
    const paths: Record<string, string> = {}

    const originPath = generatePageOriginPath(allNodes, originNode)

    const lookupPath = (node: JaenPage, pathPrefix = '/') => {
      paths[pathPrefix] = node.id

      if (node.childPages.length > 0) {
        for (const {id} of node.childPages) {
          const child = allNodes.find(n => n.id === id)

          if (child) {
            lookupPath(
              child,
              pathPrefix !== '/'
                ? `${pathPrefix}/${child.slug}`
                : `/${child.slug}`
            )
          }
        }
      }
    }

    lookupPath(originNode, originPath)

    return paths
  } else {
    throw new Error('Could not generate paths for page with id: ' + pageId)
  }
}

export const generateAllPaths = (allNodes: JaenPage[]) => {
  const paths: Record<string, string> = {}

  for (const node of allNodes) {
    const path = generatePageOriginPath(allNodes, node)

    if (path) {
      paths[path] = node.id
    }
  }

  return paths
}

export const matchPath = (path1: string, path2: string) => {
  // normalize and compare
  const p1 = path1.replace(/\/$/, '')
  const p2 = path2.replace(/\/$/, '')

  return p1 === p2
}
