import deepmerge from 'deepmerge'
import {useEffect, useMemo, useState} from 'react'

import {usePageContext} from '../contexts/page'
import {RootState, store} from '../redux'
import {JaenPage} from '../types'

export interface UsePageProps {}

export const usePage = (_: UsePageProps): JaenPage => {
  const {jaenPage} = usePageContext()

  const [dynamicPage, setDynamicPage] = useState<Partial<JaenPage> | undefined>(
    undefined
  )

  useEffect(() => {
    const dynamicPage = store.getState().page.pages.nodes[jaenPage.id]

    setDynamicPage(dynamicPage)

    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState

      const dynamicPage = state.page.pages.nodes[jaenPage.id]
      setDynamicPage(dynamicPage)
    })

    return () => {
      unsubscribe()
    }
  }, [jaenPage])

  const page = useMemo(() => {
    return deepmerge(jaenPage, dynamicPage || {})
  }, [jaenPage, dynamicPage])

  return page
}
