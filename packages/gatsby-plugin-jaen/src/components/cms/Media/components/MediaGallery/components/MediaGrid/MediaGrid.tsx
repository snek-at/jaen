import {Box, SimpleGrid} from '@chakra-ui/react'
import {MediaNode} from 'jaen'
import React from 'react'

import {MediaItem} from '../MediaItem/MediaItem'

const MemoedMediaItem = React.memo(MediaItem)

export interface MediaGridProps {
  mediaNodes: MediaNode[]
  selectedMediaNode: MediaNode | null

  columnCount: number

  onSelect?: (node: MediaNode | null) => void
  onDoubleClick?: (node: MediaNode) => void
  onUpdateDescription?: (description: string) => void
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  mediaNodes,
  selectedMediaNode,
  columnCount,
  onSelect,
  onDoubleClick,
  onUpdateDescription
}) => {
  if (mediaNodes.length === 0) {
    return (
      <Box p="4" textAlign="center">
        No media found
      </Box>
    )
  }

  return (
    <SimpleGrid
      onClick={() => {
        onSelect?.(null)
      }}
      columns={[1, 2, columnCount, columnCount + 1]}
      spacing={2}
      p="1">
      {mediaNodes.map((node, index) => (
        <MemoedMediaItem
          key={`${node.id}-${node.modifiedAt}`}
          node={node}
          isLast={index === mediaNodes.length - 1}
          isSelected={selectedMediaNode?.id === node.id}
          onClick={e => {
            e.stopPropagation() // Prevent event propagation to parent element
            onSelect?.(node)
          }}
          onDoubleClick={e => {
            e.stopPropagation() // Prevent event propagation to parent element
            onDoubleClick?.(node)
          }}
          onUpdateDescription={onUpdateDescription}
        />
      ))}
    </SimpleGrid>
  )
}
