// CMSManagementContext.tsx
import deepmerge from 'deepmerge'
import {createContext, ReactNode, useCallback, useContext, useMemo} from 'react'
import {FaRocket} from '@react-icons/all-files/fa/FaRocket'

import {
  resetState,
  RootState,
  store,
  useAppDispatch,
  useAppSelector,
  withRedux
} from '../redux'
import {actions as pageActions} from '../redux/slices/page'
import * as statusActions from '../redux/slices/status'
import {actions as siteActions} from '../redux/slices/site'
import * as widgetActions from '../redux/slices/widget'

import {JaenPage, JaenTemplate, SiteMetadata} from '../types'
import {deepmergeArrayIdMerge} from '../utils/deepmerge'
import {useSiteMetadataContext} from './site-metadata'
import {uploadFile} from '../utils/open-storage-gateway'
import {useNotificationsContext} from './notifications'
import {sqJaen} from '../clients/jaen/src'

// Errors

export class DuplicateSlugError extends Error {
  constructor(slug: string) {
    super(`Could not add page with slug ${slug} as it is not unique`)
  }
}

// Define the type for the CMSManagementContext data
interface CMSManagementContextData {
  templates: JaenTemplate[]
  templatesForPage: (pageId: string) => JaenTemplate[]

  siteMetadata: Partial<SiteMetadata>
  updateSiteMetadata: (siteMetadata: Partial<SiteMetadata>) => void

  page: (pageId?: string) => JaenPage
  usePage: (pageId?: string) => JaenPage
  pages: (parentId?: string) => JaenPage[]
  isEditing: boolean
  isPublishing: boolean
  setIsPublishing: (publishing: boolean) => void
  tree: Array<{
    id: string
    label: string
    children: Array<CMSManagementContextData['tree'][0]>
    showInNodeGraphVisualizer: boolean
  }>
  pagePath: (pageId: string) => string
  addPage: (page: Partial<JaenPage>) => string
  removePage: (pageId: string) => void
  updatePage: (pageId: string, updatedPage: Partial<JaenPage>) => void
  clonePage: (pageId: string, slug?: string) => void
  setIsEditing: (editing: boolean) => void

  draft: {
    save: () => void
    import: () => Promise<void>
    discard: () => void
    publish: () => void
  }
}

// Create the initial context
const CMSManagementContext = createContext<CMSManagementContextData>({
  templates: [],
  templatesForPage: () => [],

  siteMetadata: {},
  updateSiteMetadata: () => {},

  page: function () {
    throw new Error('Function not implemented.')
  },
  usePage: function () {
    throw new Error('Function not implemented.')
  },
  pages: () => [],
  tree: [],
  pagePath: () => '',
  isEditing: false,
  isPublishing: false,
  setIsPublishing: () => {},
  addPage: () => '',
  removePage: () => {},
  updatePage: () => {},
  clonePage: () => {},
  setIsEditing: () => {},
  draft: {
    save: () => {},
    import: () => Promise.resolve(),
    discard: () => {},
    publish: () => {}
  }
})

// Define the CMSManagementProvider props
interface CMSManagementProviderProps {
  staticPages: JaenPage[]
  templates: JaenTemplate[]
  children: ReactNode
}

// Create the CMSManagementProvider component
export const CMSManagementProvider = withRedux(
  ({staticPages, children, templates}: CMSManagementProviderProps) => {
    const dispatch = useAppDispatch()

    const notification = useNotificationsContext()

    const siteMetadata = useSiteMetadataContext()

    const updateSiteMetadata = useCallback(
      (siteMetadata: Partial<SiteMetadata>) => {
        dispatch(siteActions.updateSiteMetadata(siteMetadata))
      },
      [dispatch]
    )

    // flags?
    const isEditing = useAppSelector(state => state.status.isEditing)

    const setIsEditing = (flag: boolean) => {
      dispatch(statusActions.setIsEditing(flag))
    }

    const isPublishing = useAppSelector(state => state.status.isPublishing)

    const setIsPublishing = (flag: boolean) => {
      dispatch(statusActions.setIsPublishing(flag))
    }

    const dynamicPagesDict = useAppSelector(state => state.page.pages.nodes)

    const pagesDict = useMemo(() => {
      const mergePages = (
        target: Partial<JaenPage>,
        source: Partial<JaenPage>
      ) => {
        return deepmerge(target, source, {
          arrayMerge: deepmergeArrayIdMerge
        })
      }

      const filterDeletedPages = (pageDict: {
        [x: string]: Partial<JaenPage>
      }) => {
        const cleanDict: {[x: string]: Partial<JaenPage>} = {}

        for (const [pageId, page] of Object.entries(pageDict)) {
          if (!page.deleted) {
            cleanDict[pageId] = {...page}

            if (page.childPages) {
              const validChildren = page.childPages.filter(child => {
                return !child.deleted && !pageDict[child.id]?.deleted
              })

              cleanDict[pageId]!.childPages = validChildren
            }
          }
        }

        return cleanDict
      }

      const createPagesDictionary = (
        dynamicPagesDict: Record<string, Partial<JaenPage>>,
        staticPages: JaenPage[]
      ) => {
        const combinedPagesDict = {...dynamicPagesDict}

        for (const staticPage of staticPages) {
          if (combinedPagesDict[staticPage.id]) {
            combinedPagesDict[staticPage.id] = mergePages(
              staticPage,
              combinedPagesDict[staticPage.id] || {}
            )
          } else {
            combinedPagesDict[staticPage.id] = staticPage
          }
        }

        return filterDeletedPages(combinedPagesDict)
      }

      return createPagesDictionary(dynamicPagesDict, staticPages)
    }, [dynamicPagesDict, staticPages])

    const pages = useCallback(
      (parentId?: string) => {
        const valuesWithIds = Object.entries(pagesDict).map(([key, value]) => ({
          id: key,
          ...value
        }))

        if (parentId) {
          const parentPage = valuesWithIds.find(page => page.id === parentId)

          if (parentPage) {
            const childPages = parentPage.childPages || []
            const sortedChildPages = [...childPages]

            sortedChildPages.sort((a, b) => {
              // Check if the parentPage has a childPagesOrder
              if (!parentPage.childPagesOrder) {
                return 5
              }

              const aIndex = parentPage.childPagesOrder?.indexOf(a.id)
              const bIndex = parentPage.childPagesOrder?.indexOf(b.id)

              return aIndex - bIndex
            })

            return sortedChildPages.map(child => {
              const found = valuesWithIds.find(page => page.id === child.id)

              if (!found) {
                throw new Error(
                  `Could not find page with id ${child.id} in pagesDict`
                )
              }

              return found
            }) as JaenPage[]
          }
        }

        // If no parentId is provided or if there's no childPagesOrder, return all pages
        return Object.values(valuesWithIds) as JaenPage[]
      },
      [pagesDict]
    )

    const page = useCallback(
      (pageId: string = 'JaenPage /') => {
        const found = pages().find(p => p.id === pageId)

        if (!found) {
          throw new Error(`Could not find page with id ${pageId}`)
        }

        return found
      },
      [pages]
    )

    const usePage = useCallback(
      (pageId: string = 'JaenPage /') => {
        const found = pages().find(p => p.id === pageId)

        if (!found) {
          throw new Error(`Could not find page with id ${pageId}`)
        }

        return found
      },
      [pages]
    )

    const addPage = (page: Partial<JaenPage>) => {
      // check if slug is unique
      const slug = page.slug || 'new-page'

      const isSlugDuplicate = pages().some(page => page.slug === slug)

      if (isSlugDuplicate) {
        throw new DuplicateSlugError(slug)
      }

      dispatch(pageActions.page_updateOrCreate(page))

      return store.getState().page.pages.lastAddedNodeId
    }

    const updatePage = (
      pageId: string,
      updatedPage: Partial<JaenPage>
    ): void => {
      const page = pagesDict[pageId]

      function deepObjectDiff(
        obj1: Partial<JaenPage>,
        obj2: Partial<JaenPage>
      ) {
        function compareObjects(
          o1: {[x: string]: any},
          o2: {[x: string]: any; hasOwnProperty: (arg0: string) => any}
        ) {
          for (const key in o2) {
            if (o2.hasOwnProperty(key)) {
              if (
                o1[key] &&
                typeof o1[key] === 'object' &&
                o2[key] &&
                typeof o2[key] === 'object'
              ) {
                if (!compareObjects(o1[key], o2[key])) {
                  return false
                }
              } else if (o1[key] !== o2[key]) {
                return false
              }
            }
          }
          return true
        }

        const diff: Partial<JaenPage> = {}

        for (const key in obj2) {
          if (
            !obj1.hasOwnProperty(key) ||
            (typeof obj2[key] === 'object' &&
              !compareObjects(obj1[key], obj2[key])) ||
            (typeof obj2[key] !== 'object' && obj1[key] !== obj2[key])
          ) {
            diff[key] = obj2[key]
          }
        }

        return diff
      }

      updatedPage = deepObjectDiff(page || {}, updatedPage)

      // check if slug is unique when updating slug
      const slug = updatedPage.slug || 'new-page'

      const parentPage = updatedPage.parentPage || page?.parentPage

      const isSlugDuplicate = pages(parentPage?.id).some(
        page => page.slug === slug && page.id !== pageId
      )

      if (isSlugDuplicate) {
        throw new DuplicateSlugError(slug)
      }

      dispatch(
        pageActions.page_updateOrCreate({
          id: pageId,
          ...updatedPage,
          fromId:
            // Only set the fromId if the parentPage has changed
            updatedPage?.parentPage?.id || updatedPage?.parentPage === null
              ? page?.parentPage?.id
              : undefined
        })
      )
    }

    const removePage = (pageId: string) => {
      // delete page and all children
      const deletePage = (pageId: string) => {
        const page = pagesDict[pageId]

        if (!page) {
          throw new Error(`Could not find page with id ${pageId}`)
        }

        dispatch(pageActions.page_markForDeletion(pageId))

        if (page.childPages) {
          for (const child of page.childPages) {
            deletePage(child.id)
          }
        }
      }

      deletePage(pageId)
    }

    const clonePage = (pageId: string, slug?: string) => {
      const page = pagesDict[pageId]

      if (!page) {
        throw new Error(`Could not find page with id ${pageId}`)
      }

      const newPage: Partial<JaenPage> = {
        ...page,
        id: undefined,
        slug: slug || page.slug + '-copy',
        jaenPageMetadata: {
          ...page.jaenPageMetadata,
          title: page.jaenPageMetadata?.title + ' (copy)'
        }
      }

      const newPageId = addPage(newPage)

      if (page.childPages) {
        for (const child of page.childPages) {
          clonePage(child.id, child.slug)
        }
      }

      return newPageId
    }

    const tree = useMemo(() => {
      const tree: CMSManagementContextData['tree'] = []

      // recursive function to build the tree
      const buildTree = (
        parentId?: string
      ): CMSManagementContextData['tree'] => {
        const children = pages(parentId)

        return children.map(child => ({
          id: child.id,
          label: child.jaenPageMetadata.title || child.slug,
          showInNodeGraphVisualizer:
            child.pageConfig?.showInNodeGraphVisualizer ?? true,
          children: buildTree(child.id)
        }))
      }

      const root = page('JaenPage /')

      tree.push({
        id: root.id,
        label: root.jaenPageMetadata.title || root.slug,
        showInNodeGraphVisualizer:
          root.pageConfig?.showInNodeGraphVisualizer ?? true,
        children: buildTree(root.id)
      })

      return tree
    }, [pages])

    const pagePath = useCallback(
      (pageId: string) => {
        const page = pagesDict[pageId]

        if (!page) {
          throw new Error(`Could not find page with id ${pageId}`)
        }

        if (page.slug === 'root') return '/'

        const pathParts = [page.slug]

        let parent = pagesDict[page.parentPage?.id || '']

        while (parent && parent.slug !== 'root') {
          pathParts.unshift(parent.slug)
          parent = pagesDict[parent.parentPage?.id || '']
        }

        const path = pathParts.join('/')

        return path.startsWith('/') ? path : '/' + path
      },
      [pagesDict]
    )

    const templatesForPage = useCallback(
      (pageId: string) => {
        const page = pagesDict[pageId]

        if (!page) {
          throw new Error(`Could not find page with id ${pageId}`)
        }

        if (page.template) {
          return (
            templates.find(template => template.id === page.template)
              ?.childTemplates || []
          )
        }

        if (page.pageConfig?.childTemplates) {
          const childTemplates: JaenTemplate[] = []

          for (const childTemplateId of page.pageConfig?.childTemplates) {
            const childTemplate = templates.find(
              template => template.id === childTemplateId
            )

            if (childTemplate) {
              childTemplates.push(childTemplate)
            }
          }

          return childTemplates
        }

        return []
      },
      [pagesDict, templates]
    )

    const saveDraft = useCallback(() => {
      // Implement the logic to save the draft state in the Redux store
      // For example, you can update the draft state for the current page in the DraftData object
      // dispatch(draftActions.saveDraft(pageId));

      const state = store.getState()

      // Generate a unique identifier for the draft
      const draftId = Date.now()
      const blob = new Blob([JSON.stringify({draftId, state})], {
        type: 'application/json'
      })

      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `jaen-draft-${draftId}.json`

      // Programmatically initiate the download
      a.click()

      // Remove the temporary anchor element
      a.remove()
    }, [])

    const importDraft = useCallback(async () => {
      return new Promise<void>((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'

        // Attach an onchange event handler to handle the file selection
        input.onchange = () => {
          const file = input.files?.item(0)

          if (!file) return

          const reader = new FileReader()

          // Read the selected file as text
          reader.onload = () => {
            try {
              const content = JSON.parse(reader.result as string)
              const {draftId, state} = content

              // Perform a validation here to check if the draftId exists and matches the filename
              const regex = /^jaen-draft-(\d+)\.json$/
              const match = file.name.match(regex)
              if (match && match[1] === draftId.toString()) {
                // Dispatch an action with the parsed state object to update the Redux store
                resetState(state)

                // Resolve the promise
                resolve()
              } else {
                // Handle invalid file (the file is not a valid draft file)
                reject('Invalid draft file. Please select a valid draft file.')
              }
            } catch (error) {
              console.error(error)
              // Handle JSON parsing error
              reject(
                'Error parsing draft file. Please select a valid draft file.'
              )
            }
          }

          // Start reading the selected file
          reader.readAsText(file)
        }

        // Programmatically trigger the file input click to open the file picker
        input.click()
      })
    }, [])

    const discardDraft = useCallback(() => {
      dispatch(pageActions.discardAllChanges())
      dispatch(siteActions.discardAllChanges())
      dispatch(widgetActions.discardAllChanges())

      // reset status
      setIsEditing(false)
      setIsPublishing(false)
    }, [setIsEditing, setIsPublishing])

    const publishDraft = useCallback(async () => {
      try {
        const state = store.getState() as RootState

        const message = await notification.prompt(
          {
            icon: FaRocket,
            title: 'Publishing',
            message: 'Enter a message for the publish commit',
            confirmText: 'Publish',
            cancelText: 'Cancel'
          },
          `Update ${Object.values(state.page.pages.nodes).length} pages`
        )

        if (message) {
          const migrationData = {
            message,
            createdAt: new Date().toISOString(),
            data: {
              pages: Object.entries(state.page.pages.nodes).map(
                ([id, page]) => ({
                  id,
                  ...page
                })
              ),
              site: state.site,
              widgets: state.widget.nodes
            }
          }

          const uploadedMigration = await uploadFile(
            migrationData,
            `migrations-${Date.now()}.json`
          )

          if (uploadedMigration) {
            const [_, errors] = await sqJaen.mutate(m =>
              m.publish({
                config: {
                  repository: __JAEN_REMOTE__.repository,
                  repositoryCwd: __JAEN_REMOTE__.cwd
                },
                migrationURL: uploadedMigration.fileUrl
              })
            )

            if (errors) {
              console.error(errors)
              notification.toast({
                status: 'error',
                title: 'Migration',
                description: 'An error occurred during migration publishing'
              })
            } else {
              notification.toast({
                status: 'success',
                title: 'Migration',
                description: 'Migration published successfully'
              })

              // set publishing status
              setIsPublishing(true)
            }
          } else {
            notification.toast({
              status: 'error',
              title: 'Migration',
              description: 'Migration file could not be uploaded'
            })
          }
        }
      } catch (error) {
        console.error('An error occurred:', error)
        notification.toast({
          status: 'error',
          title: 'Error',
          description: 'An unexpected error occurred'
        })
      }
    }, [])

    return (
      <CMSManagementContext.Provider
        value={{
          templates,
          siteMetadata,
          updateSiteMetadata,
          page,
          usePage,
          pages,
          templatesForPage,
          tree,
          pagePath,
          isEditing,
          isPublishing,
          setIsPublishing,
          addPage,
          removePage,
          updatePage,
          clonePage,
          setIsEditing,
          draft: {
            save: saveDraft,
            import: importDraft,
            discard: discardDraft,
            publish: publishDraft
          }
        }}>
        {children}
      </CMSManagementContext.Provider>
    )
  }
)

// Custom hook to consume the CMSManagementContext
export function useCMSManagementContext() {
  return useContext(CMSManagementContext)
}
