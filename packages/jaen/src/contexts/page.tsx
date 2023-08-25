import {createContext, useContext, useEffect, useMemo, useState} from 'react'

import {RootState, store} from '../redux'
import {IJaenState} from '../redux/types'
import {JaenPage} from '../types'

export interface PageProviderProps {
  jaenPage: {
    id: string
  } & Partial<JaenPage>
  jaenPages?: Array<Partial<JaenPage>>
}

export interface PageContextType extends PageProviderProps {}

export const PageContext = createContext<PageContextType | undefined>(undefined)

export const PageProvider: React.FC<
  React.PropsWithChildren<PageProviderProps>
> = ({children, jaenPage, jaenPages}) => {
  return (
    <PageContext.Provider
      value={{
        jaenPage,
        jaenPages
      }}>
      {children}
    </PageContext.Provider>
  )
}

/**
 * Access the PageContext.
 *
 * @example
 * ```
 * const {jaenPage} = usePageContext()
 * ```
 */
export const usePageContext = () => {
  const context = useContext(PageContext)

  if (context === undefined) {
    throw new Error('useJaenPageContext must be within PageContext')
  }

  return context
}

export interface UsePageIndexProps {
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead the page context of the provided jaenPageId will be used.
   *
   * Priority: jaenPageId > path > current page
   */
  jaenPageId?: string
  /**
   * Opts out the field from the page content on which it is applied.
   * Instead it resolves the page by the provided path.
   *
   * This is useful when you want to use a dynamic page as a context.
   *
   * Priority: jaenPageId > path > current page
   */
  path?: string
  filter?: (page: Partial<JaenPage>) => boolean
  sort?: (a: Partial<JaenPage>, b: Partial<JaenPage>) => number
}

export const useJaenPageIndex = (
  props?: UsePageIndexProps
): {
  childPages: Array<{id: string} & Partial<JaenPage>>
  withJaenPage: (childId: string, children: React.ReactNode) => React.ReactNode
} => {
  const {jaenPage, jaenPages} = usePageContext()

  let id = jaenPage.id

  if (props?.jaenPageId) {
    id = props?.jaenPageId
  } else if (props?.path) {
    if (jaenPages == null) {
      throw new Error('Unable to resolve page by path. No pages provided.')
    }

    const resolveJaenPageIdByPath = (
      path: string,
      staticPages: Array<Partial<JaenPage>>
    ) => {
      const state = store.getState() as IJaenState
      const dynamicPageId = state.page.routing.dynamicPaths[path]?.pageId

      if (dynamicPageId) {
        return dynamicPageId
      }

      return staticPages.find(page => page.buildPath === path)?.id
    }

    const path = props?.path

    const newId = resolveJaenPageIdByPath(path, jaenPages)

    if (!newId) {
      throw new Error(`Could not resolve page by path: ${path}`)
    }

    id = newId
  }

  const staticChildren = useMemo(() => {
    const jaenPagesChildren: Array<{id: string} & Partial<JaenPage>> =
      jaenPages?.find(page => page.id === id)?.childPages || []

    let children: Array<{id: string} & Partial<JaenPage>> = []

    if (jaenPage.id === id) {
      children = jaenPage.childPages || []
    }

    const mergedChildren = [...children, ...jaenPagesChildren]

    // Filter out duplicates based on the ID
    const uniqueChildren = mergedChildren.filter(
      (child, index, self) => index === self.findIndex(c => c.id === child.id)
    )

    return uniqueChildren
  }, [jaenPage, jaenPage.childPages, jaenPages, id])

  const [dynamicChildrenIds, setDynamicChildrenIds] = useState(() => {
    const state = store.getState() as IJaenState

    return state.page.pages.nodes[id]?.childPages
  })

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as RootState

      const page = state.page.pages.nodes[id]
      if (page) {
        const onlyNotDeleted = page.childPages?.filter(c => !c.deleted)

        setDynamicChildrenIds(onlyNotDeleted)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  const [dynamicChildren, setDynamicChildren] = useState<JaenPage[]>([])

  useEffect(() => {
    if (dynamicChildrenIds) {
      const state = store.getState() as IJaenState

      const dynamicJaenPages = state.page.pages.nodes
      const ds = dynamicChildrenIds.map(({id}) => ({
        id,
        ...dynamicJaenPages[id]
      })) as JaenPage[]

      setDynamicChildren(ds)
    }
  }, [dynamicChildrenIds])

  // merge children with staticChildren by id
  const childPages = useMemo(() => {
    // This is a double check for deleted pages just in case
    let mergedChildren = [...staticChildren, ...dynamicChildren].filter(
      c => !c.excludedFromIndex && !c.deleted
    )

    if (props) {
      const {filter, sort} = props

      if (filter) {
        mergedChildren = mergedChildren.filter(filter)
      }

      if (sort) {
        mergedChildren = mergedChildren.sort(sort)
      }
    }

    return mergedChildren
  }, [staticChildren, dynamicChildren, props])

  return {
    childPages,
    withJaenPage: (childId: string, children: React.ReactNode) => {
      const jaenPage = staticChildren?.find(c => c.id === childId)

      return (
        <PageProvider jaenPage={{...jaenPage, id: childId}} key={childId}>
          {children}
        </PageProvider>
      )
    }
  }
}
