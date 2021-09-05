import {Button, useDisclosure} from '@chakra-ui/react'
import SnekFinder from '@containers/SnekFinder'
import {usePages, useCMSContext} from '@contexts/cms'
import {useLocation} from '@reach/router'
import {PageExplorer, PageExplorerProps} from '@snek-at/jaen-shared-ui'
import {PageType} from '@src/types'
import {resolveDynamicPath} from '@src/utils'
import * as actions from '@store/actions/siteActions'
import {useAppDispatch, useAppSelector} from '@store/index'
import {withRedux} from '@store/withRedux'
import {navigate} from 'gatsby'
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'

const transformToItems = (pages: {
  [id: string]: PageType
}): PageExplorerProps['items'] =>
  Object.fromEntries(
    Object.entries(pages).map(([id, page]) => {
      const {
        title,
        slug,
        parent,
        children,
        template,
        pageMetadata,
        deleted
      } = page

      return [
        id,
        {
          data: {
            slug: slug || page?.path?.split('/')[1] || 'root',
            title: pageMetadata?.title || (title as string),
            description: pageMetadata?.description || '',
            image: pageMetadata?.image || '',
            isBlogPost: pageMetadata?.isBlogPost || false,
            lastPublished: pageMetadata?.datePublished,
            templateName: template,
            locked: !template
          },
          children: children.map(({id}) => id),
          parent: parent ? parent.id : null,
          deleted
        }
      ]
    })
  )

const PagesTab: React.FC<{}> = () => {
  const dispatch = useAppDispatch()

  const cmsContext = useCMSContext()
  const allSitePage = usePages()
  const fileSelector = useDisclosure()

  const dynamicPaths = useAppSelector(state => state.site.routing.dynamicPaths)
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname)

  const defaultSelection = React.useMemo(() => {
    // find the node that matches the current path
    const dynamicId = currentPath && dynamicPaths[currentPath]

    if (!dynamicId) {
      for (const [id, node] of Object.entries(allSitePage.nodes)) {
        if (node.path === currentPath) {
          return id
        }
      }
    }

    return dynamicId
  }, [allSitePage.nodes, currentPath, dynamicPaths]) as string

  const templates = React.useMemo(
    () => cmsContext.templates.map(e => e.TemplateName),
    [cmsContext.templates]
  )

  const [fileSelectorPageId, setFileSelectorPageId] = React.useState<
    string | null
  >(null)

  const [nextRoutingUpdate, setNextRoutingUpdate] = React.useState<
    string | null
  >(null)

  React.useEffect(() => {
    if (nextRoutingUpdate) {
      const dynamicPaths = resolveDynamicPath(nextRoutingUpdate, allSitePage)

      dispatch(actions.updateSiteRouting({dynamicPaths}))

      setNextRoutingUpdate(null)
    }
  }, [allSitePage])

  const updateRouting = (id: string) => {
    setNextRoutingUpdate(id)
  }

  const handlePageCreate = (
    parentId: string | null,
    title: string,
    slug: string,
    template: string
  ) => {
    const pageId = `SitePage /${uuidv4()}`
    dispatch(
      actions.addPage({
        pageId,
        page: {
          slug,
          template,
          parent: parentId ? {id: parentId} : null,
          children: [],
          fields: {},
          pageMetadata: {
            title,
            description: '',
            image: '',
            canonical: '',
            isBlogPost: false
          }
        }
      })
    )

    updateRouting(pageId)
  }
  const handlePageUpdate = (
    id: string,
    values: Partial<{
      title: string
      slug: string
      description: string
      image: string
      isBlogPost: boolean
      lastPublished?: string | undefined
    }>
  ) => {
    const meta = allSitePage.nodes[id].pageMetadata
    dispatch(
      actions.updatePage({
        pageId: id,
        slug: values.slug,
        meta: {
          title: values.title || meta?.title,
          description: values.description || meta?.description,
          image: values.image || meta?.image,
          isBlogPost: values.isBlogPost || meta?.isBlogPost,
          datePublished: values.lastPublished || meta?.datePublished
        }
      })
    )
    updateRouting(id)
    handleNavigate(id)
  }
  const handlePageDelete = (id: string) => {
    handleNavigate(null)

    dispatch(actions.deletePage(id))
    updateRouting(id)
  }
  const handlePageMove = (pageId: string, parentPageId: string | null) => {
    dispatch(
      actions.movePage({
        pageId,
        parentPageId
      })
    )

    updateRouting(pageId)
    handleNavigate(pageId)
  }

  const handleItemImageClick = (pageId: string) => {
    setFileSelectorPageId(pageId)

    fileSelector.onOpen()
  }

  const handleNavigate = (pageId: string | null) => {
    let pagePath
    const nodes = allSitePage.nodes
    if (pageId) {
      pagePath = Object.keys(dynamicPaths).find(
        key => dynamicPaths[key] === pageId
      )

      if (!pagePath) {
        pagePath = nodes[pageId].path
      }
    }

    const newPagePath = pagePath || '/'

    setCurrentPath(newPagePath)
    navigate(newPagePath)
  }

  // TODO: move to a loading state in order to improve performence
  const items = React.useMemo(() => transformToItems(allSitePage.nodes), [
    allSitePage.nodes
  ])

  return (
    <>
      <PageExplorer
        items={items}
        rootItemIds={allSitePage.rootNodeIds}
        defaultSelection={defaultSelection}
        templates={templates}
        onItemCreate={handlePageCreate}
        onItemDelete={handlePageDelete}
        onItemUpdate={handlePageUpdate}
        onItemMove={handlePageMove}
        onItemSelect={handleNavigate}
        onItemImageClick={handleItemImageClick}
      />
      {fileSelector.isOpen && (
        <SnekFinder
          mode="selector"
          onSelectorClose={fileSelector.onClose}
          onSelectorSelect={i => {
            if (fileSelectorPageId) {
              handlePageUpdate(fileSelectorPageId, {image: i.src})
            }
            setFileSelectorPageId(null)
            fileSelector.onClose()
          }}
        />
      )}
    </>
  )
}

export default withRedux(PagesTab)
