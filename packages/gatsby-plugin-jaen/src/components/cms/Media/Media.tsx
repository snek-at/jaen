import {MediaNode} from '@atsnek/jaen'
import {Flex, Heading, HStack, IconButton, Stack} from '@chakra-ui/react'
import React, {useEffect, useMemo, useState} from 'react'

import {BsLayoutSidebarInset} from '@react-icons/all-files/bs/BsLayoutSidebarInset'

import {PageTree} from '../../shared/PageTree/PageTree'
import {TreeNode} from '../Pages/components/PageVisualizer'
import {MediaGallery} from './components/MediaGallery/MediaGallery'
import {MediaPreview} from './components/MediaPreview/MediaPreview'
import {MediaPreviewState} from './types'

export interface MediaProps {
  mediaNodes: MediaNode[]
  tree: Array<TreeNode>

  onUpload: (files: File[]) => Promise<void>

  onDelete: (ids: string) => void
  onUpdate: (
    id: string,
    data: Partial<
      MediaNode & {
        file: File
      }
    >
  ) => void
  onClone: (id: string) => void
  onDownload: (id: string) => void

  isSelector?: boolean
  onSelect?: (id: string) => void

  // media node id
  defaultSelected?: string

  onJaenPageSelect: (id: string | null) => void
}

export const Media: React.FC<MediaProps> = ({
  tree,
  mediaNodes,
  onUpload,
  onDelete,
  onUpdate,
  onClone,
  onDownload,
  isSelector,
  onSelect,
  defaultSelected,
  onJaenPageSelect
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false) // State variable for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const [isPreview, setPreview] = useState<MediaPreviewState>(false)

  const handlePreview = (state: MediaPreviewState) => {
    setPreview(state)
  }

  const defaultSelectedMediaNode = useMemo(() => {
    if (defaultSelected) {
      return mediaNodes.find(node => node.id === defaultSelected) || null
    }

    return null
  }, [defaultSelected, mediaNodes])

  const [selectedMediaNode, setSelectedMediaNode] = useState<MediaNode | null>(
    null
  )

  useEffect(() => {
    // reselect media node if it still exists
    if (selectedMediaNode) {
      const node = mediaNodes.find(node => node.id === selectedMediaNode.id)

      if (node) {
        setSelectedMediaNode(node)
      } else {
        setSelectedMediaNode(null)
      }
    }
  }, [mediaNodes])

  const [filters, setFilters] = useState<{
    page?: {
      jaenPageId: string
      label: string
    }
  }>({})

  const removePageFilter = () => {
    setFilters({
      ...filters,
      page: undefined
    })

    onJaenPageSelect(null)
  }

  const filteredMediaNodes = useMemo(() => {
    if (filters.page) {
      return mediaNodes.filter(node => {
        return node.jaenPageId === filters.page?.jaenPageId
      })
    }

    return mediaNodes
  }, [filters, mediaNodes])

  const sortedMediaNodes = filteredMediaNodes.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleClone = (id: string) => {
    onClone(id)

    setSelectedMediaNode(null)
  }

  return (
    <Flex id="coco" pos="relative" minH="calc(100dvh - 4rem - 3rem)">
      <Stack
        as="nav"
        h="calc(100dvh - 4rem)"
        pos="sticky"
        top="0"
        w="xs"
        borderRight="1px solid"
        borderColor="border.emphasized"
        overflow="auto"
        display={isSidebarOpen ? 'block' : 'none'} // Show/hide sidebar based on state
      >
        <HStack w="full" px="4" h="12">
          <IconButton
            aria-label="close sidebar"
            fontSize="1.2em"
            icon={<BsLayoutSidebarInset />}
            variant="ghost"
            onClick={toggleSidebar}
          />
        </HStack>
        <Stack px="4" py="1" ml="2">
          <Stack>
            <Heading size="xs">Pages</Heading>

            <PageTree
              tree={tree}
              defaultSelected={filters.page?.jaenPageId}
              onSelected={(id, node) => {
                setFilters({
                  ...filters,
                  page: {
                    jaenPageId: id,
                    label: node.data
                  }
                })

                onJaenPageSelect(id)
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <MediaGallery
        pageFilter={filters.page?.label}
        removePageFilter={removePageFilter}
        mediaNodes={sortedMediaNodes}
        selectedMediaNode={selectedMediaNode || defaultSelectedMediaNode}
        onSelectMediaNode={setSelectedMediaNode}
        onUpload={onUpload}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onClone={handleClone}
        onDownload={onDownload}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        isPreview={isPreview}
        onPreview={handlePreview}
        isSelector={isSelector}
        onSelect={onSelect}
      />

      <MediaPreview
        mediaNodes={sortedMediaNodes}
        isPreview={isPreview}
        selectedMediaNode={selectedMediaNode || defaultSelectedMediaNode}
        onSelectMediaNode={setSelectedMediaNode}
        onPreview={handlePreview}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onClone={handleClone}
        onDownload={onDownload}
      />
    </Flex>
  )
}
