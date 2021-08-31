import {Button, useDisclosure} from '@chakra-ui/react'
import {PageExplorer, PageExplorerProps} from '@snek-at/jaen-shared-ui'
import * as React from 'react'
import {useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

import {useAllSitePage} from '../../../contexts/cms'
import {useAppDispatch} from '../../../store'
import * as actions from '../../../store/actions/siteActions'
import {withRedux} from '../../../store/withRedux'
import {PageType} from '../../../types'
import {resolveDynamicPath} from '../../../utils'
import SnekFinder from '../../SnekFinder'

const transformToItems = (pages: {
  [id: string]: PageType
}): PageExplorerProps['items'] =>
  Object.fromEntries(
    Object.entries(pages).map(([id, page]) => {
      const {title, slug, parent, children, template, pageMetadata} = page

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
            locked: !template
          },
          children: children.map(({id}) => id),
          parent: parent ? parent.id : null
        }
      ]
    })
  )

const PagesTab: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const allSitePage = useAllSitePage()
  const fileSelector = useDisclosure()

  const [fileSelectorPageId, setFileSelectorPageId] = React.useState<
    string | null
  >(null)

  const [nextRoutingUpdate, setNextRoutingUpdate] = React.useState<
    string | null
  >(null)

  useEffect(() => {
    if (nextRoutingUpdate) {
      const dynamicPaths = resolveDynamicPath(nextRoutingUpdate, allSitePage)
      alert(JSON.stringify(dynamicPaths))

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
    const pageId = uuidv4()
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
  }
  const handlePageDelete = (id: string) => {
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
  }

  const handleItemImageClick = (pageId: string) => {
    setFileSelectorPageId(pageId)

    fileSelector.onOpen()
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
        templates={['My nice page template']}
        onItemCreate={handlePageCreate}
        onItemDelete={handlePageDelete}
        onItemUpdate={handlePageUpdate}
        onItemMove={handlePageMove}
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
