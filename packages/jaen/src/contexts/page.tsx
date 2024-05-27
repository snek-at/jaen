import deepmerge from 'deepmerge'
import {createContext, useContext, useEffect, useMemo, useState} from 'react'

import {RootState, store} from '../redux'
import {JaenPage} from '../types'
import {deepmergeArrayIdMerge} from '../utils/deepmerge'
import {useDynamicPaths} from '../hooks/use-dynamic-paths'
import {usePage} from '../hooks/use-page'

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

  /**
   * Include excluded pages in the index.
   */
  includeExcluded?: boolean

  /**
   * Sort the pages based on the `sortOrder` field.
   */
  sortByPageOrder?: boolean
}

export const useJaenPageIndex = (
  props?: UsePageIndexProps
): {
  childPages: Array<{id: string} & Partial<JaenPage>>
  withJaenPage: (childId: string, children: React.ReactNode) => React.ReactNode
} => {
  const {jaenPage, jaenPages} = usePageContext()

  const paths = useDynamicPaths({
    staticPages: (jaenPages || []) as any
  })

  const id = useMemo(() => {
    if (props?.jaenPageId) {
      return props.jaenPageId
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

  const {childPagesOrder = []} = usePage({id: id})

  const staticChildren = useMemo(() => {
    let children: Array<{id: string} & Partial<JaenPage>> = []

    if (jaenPage.id === id) {
      children = jaenPage.childPages || []
    } else {
      children = jaenPages?.find(page => page.id === id)?.childPages || []
    }

    // Filter out duplicates based on the ID
    const uniqueChildren = children.filter(
      (child, index, self) => index === self.findIndex(c => c.id === child.id)
    )

    return uniqueChildren
  }, [jaenPage, jaenPage.childPages, jaenPages, id])

  const getDynamicChildren = () => {
    const state = store.getState() as RootState

    const page = state.page.pages.nodes[id]
    if (page?.childPages) {
      const actualPages = []

      for (const {id, deleted} of page.childPages) {
        const actualChild = {
          ...state.page.pages.nodes[id],
          id,
          deleted
        }
        if (actualChild) {
          actualPages.push(actualChild)
        }
      }

      return actualPages as JaenPage[]
    }

    return []
  }

  const [dynamicChildren, setDynamicChildren] =
    useState<JaenPage[]>(getDynamicChildren)

  useEffect(() => {
    setDynamicChildren(getDynamicChildren())

    const unsubscribe = store.subscribe(() => {
      setDynamicChildren(getDynamicChildren())
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  // merge children with staticChildren by id
  const childPages = useMemo(() => {
    // This is a double check for deleted pages just in case
    let mergedChildren = deepmerge(staticChildren, dynamicChildren, {
      arrayMerge: deepmergeArrayIdMerge
    })

    mergedChildren = mergedChildren.filter(c => {
      if (props?.includeExcluded) {
        return !c.deleted
      }

      return !c.excludedFromIndex && !c.deleted
    })

    if (props?.sortByPageOrder) {
      // sort based on childPagesOrder
      mergedChildren = mergedChildren.sort((a, b) => {
        const aIndex = childPagesOrder.indexOf(a.id)
        const bIndex = childPagesOrder.indexOf(b.id)

        return aIndex - bIndex
      })
    }

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
