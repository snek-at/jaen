import deepmerge from 'deepmerge'
import {useEffect, useMemo, useState} from 'react'

import {usePageContext} from '../contexts/page'
import {RootState, store} from '../redux'
import {JaenPage} from '../types'
import {useDynamicPaths} from './use-dynamic-paths'

export interface UsePageProps {
  id?: string
  path?: string
}

export const usePage = (props: UsePageProps): JaenPage => {
  const {jaenPage, jaenPages} = usePageContext()

  const paths = useDynamicPaths({
    staticPages: (jaenPages || []) as any
  })

  const id = useMemo(() => {
    if (props?.id) {
      return props.id
    } else if (props?.path) {
      if (jaenPages == null) {
        throw new Error('Unable to resolve page by path. No pages provided.')
      }

      const path = props?.path

      const newId = paths[path]?.jaenPageId

      if (!newId) {
        throw new Error(`Could not resolve page by path: ${path}`)
      }

      return newId
    }

    return jaenPage.id
  }, [jaenPage, jaenPages, props, paths])

  const [dynamicPage, setDynamicPage] = useState<Partial<JaenPage> | undefined>(
    undefined
  )

  useEffect(() => {
    const dynamicPage = store.getState().page.pages.nodes[id]

    setDynamicPage(dynamicPage)

    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState

      const dynamicPage = state.page.pages.nodes[id]
      setDynamicPage(dynamicPage)
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  const page = useMemo(() => {
    const staticPage =
      jaenPage.id === id ? jaenPage : jaenPages?.find(page => page.id === id)

    return deepmerge(staticPage || {}, dynamicPage || {})
  }, [id, dynamicPage])

  return page
}
