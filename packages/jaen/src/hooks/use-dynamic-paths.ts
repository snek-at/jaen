import deepmerge from 'deepmerge'
import {useEffect, useMemo, useState} from 'react'

import {useAppSelector} from '../redux'
import {generatePageOriginPath} from '../utils/path'

export type DynamicPathNode = {
  id: string
  slug: string
  parentPage: {
    id: string
  } | null
  template: string | null
  buildPath: string | null
  deleted?: boolean
}

export const useDynamicPaths = (args: {
  staticPages: Array<DynamicPathNode>
}) => {
  const dynamicPages = useAppSelector(state => state.page.pages.nodes) as {
    [key: string]: DynamicPathNode
  }

  const pages = useMemo(() => {
    const newPages: Record<string, DynamicPathNode> = {}

    for (const page of args.staticPages) {
      newPages[page.id] = page
    }

    for (const [id, page] of Object.entries(dynamicPages)) {
      newPages[id] = deepmerge(newPages[id] || {}, page)

      // set id if not set
      newPages[id]!.id = id
    }

    return newPages
  }, [dynamicPages, args.staticPages])

  const [paths, setPaths] = useState<
    Record<
      string,
      {
        jaenPageId: string
        jaenTemplateId: string
        isDeleted?: boolean
      }
    >
  >({})

  useEffect(() => {
    const newPaths: Record<
      string,
      {
        jaenPageId: string
        jaenTemplateId: string
        isDeleted?: boolean
      }
    > = {}

    const pagesValues = Object.values(pages)

    for (const [pageId, page] of Object.entries(pages)) {
      const pageWithId = {
        ...page,
        id: pageId
      }

      const path = generatePageOriginPath(pagesValues, pageWithId)

      if (
        path &&
        (path !== pageWithId.buildPath || pageWithId.deleted) &&
        pageWithId.template
      ) {
        newPaths[path] = {
          jaenPageId: pageWithId.id,
          jaenTemplateId: pageWithId.template,
          isDeleted: pageWithId.deleted
        }
      }
    }

    // only update if paths changed
    if (JSON.stringify(newPaths) !== JSON.stringify(paths)) {
      setPaths(newPaths)
    }
  }, [pages])

  return paths
}
