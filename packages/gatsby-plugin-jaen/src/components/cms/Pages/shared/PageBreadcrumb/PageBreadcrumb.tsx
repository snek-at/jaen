import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react'
import {useEffect, useState} from 'react'

import {TreeNode} from '../../components/PageVisualizer'
import {Link} from '../../../../shared/Link'

export interface PageBreadcrumbProps {
  tree: Array<TreeNode>
  activePageId: string
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = props => {
  const [treePath, setTreePath] = useState<
    Array<{
      id: string
      label: string
    }>
  >([])

  useEffect(() => {
    const path: Array<{
      id: string
      label: string
    }> = []

    const findPath = (tree: Array<TreeNode>, id: string) => {
      for (const node of tree) {
        if (node.id === id) {
          path.push({
            id: node.id,
            label: node.label
          })
          return true
        }

        if (node.children) {
          if (findPath(node.children, id)) {
            path.push({
              id: node.id,
              label: node.label
            })
            return true
          }
        }
      }

      return false
    }

    findPath(props.tree, props.activePageId)

    // reverse path
    path.reverse()

    setTreePath(path)
  }, [props.tree, props.activePageId])

  return (
    <Breadcrumb color="fg.muted" separator="/">
      {treePath.map((item, index) => {
        const isCurrentPage = index === treePath.length - 1

        return (
          <BreadcrumbItem key={item.id} isCurrentPage={isCurrentPage}>
            <BreadcrumbLink
              as={isCurrentPage ? undefined : Link}
              to={`#${btoa(item.id)}`}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
