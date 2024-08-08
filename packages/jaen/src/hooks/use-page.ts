import deepmerge from 'deepmerge'
import {useEffect, useMemo, useState} from 'react'

import {usePageContext} from '../contexts/page'
import {RootState, store} from '../redux'
import {IJaenBlock, JaenPage, MediaNode} from '../types'
import {useDynamicPaths} from './use-dynamic-paths'

export interface UsePageProps {
  id?: string
  path?: string
  injectMedia?: boolean
}

export const usePage = (props: UsePageProps = {}) => {
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

      const populateDynamicPage = (page: {id: string} & Partial<JaenPage>) => {
        page.childPages = page.childPages?.map(childPage => {
          const childPageData = state.page.pages.nodes[childPage.id]

          let populatedPage: {id: string} & Partial<JaenPage> = {
            ...childPage,
            ...childPageData
          }

          // Recursively populate childPages
          populatedPage = populateDynamicPage(populatedPage)

          return populatedPage
        })

        const mediaPage =
          store.getState().page.pages.nodes['JaenPage /cms/media/']

        page.mediaNodes = (
          Object.values(
            mediaPage?.jaenFields['IMA:MEDIA_NODES']?.media_nodes?.value || {}
          ).filter((mediaNode: MediaNode) => {
            return page.id === mediaNode.jaenPageId
          }) || []
        ).map((mediaNode: MediaNode) => {
          return {
            id: mediaNode.id,
            node: {
              childImageSharp: {
                gatsbyImageData: {
                  placeholder: {
                    fallback: mediaNode.preview?.url
                  },
                  layout: 'constrained',
                  images: {
                    fallback: {
                      src: mediaNode.url
                    }
                  },
                  width: mediaNode.width,
                  height: mediaNode.height
                }
              }
            },
            description: mediaNode.description || ''
          }
        })

        return page
      }

      if (dynamicPage) {
        setDynamicPage(
          populateDynamicPage({
            ...dynamicPage,
            id
          })
        )
      }
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  const page = useMemo(() => {
    const staticPage =
      jaenPage.id === id ? jaenPage : jaenPages?.find(page => page.id === id)

    const mergedPage = deepmerge(staticPage || {}, dynamicPage || {})

    if (props.injectMedia) {
      // Deep replace all values of jaenFields[IMA:ImageField][name].value with the media node

      let mediaNodes = mergedPage.mediaNodes

      const replaceJaenFieldsImageValueIfImageField = (
        value: JaenPage | IJaenBlock
      ) => {
        mediaNodes = value.mediaNodes || mediaNodes

        for (const key in value.jaenFields) {
          const field = value.jaenFields[key]!

          if (key === 'IMA:ImageField') {
            for (const value of Object.values(field)) {
              const mediaNode = mediaNodes.find(
                mediaNode => mediaNode.id === value.value
              )

              if (mediaNode) {
                value.value = mediaNode
              }
            }
          }
        }
      }

      replaceJaenFieldsImageValueIfImageField(mergedPage)

      // Process sections

      for (const section of mergedPage.sections) {
        for (const item of section.items) {
          replaceJaenFieldsImageValueIfImageField(item)
        }
      }

      // Process child pages

      for (const childPage of mergedPage.childPages) {
        replaceJaenFieldsImageValueIfImageField(childPage as JaenPage)
      }
    }

    return mergedPage
  }, [id, dynamicPage])

  return page
}
