import {
  AspectRatio,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spacer,
  Text
} from '@chakra-ui/react'
import {MediaNode} from '@atsnek/jaen'
import {useEffect} from 'react'
import FilerobotImageEditor, {TABS} from 'react-filerobot-image-editor'

import {FaArrowLeft} from '@react-icons/all-files/fa/FaArrowLeft'
import {FaArrowRight} from '@react-icons/all-files/fa/FaArrowRight'
import {FaClone} from '@react-icons/all-files/fa/FaClone'
import {FaDownload} from '@react-icons/all-files/fa/FaDownload'
import {FaSlidersH} from '@react-icons/all-files/fa/FaSlidersH'
import {FaTrash} from '@react-icons/all-files/fa/FaTrash'

import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch'

import {MediaPreviewState} from '../../types'

export interface MediaPreviewProps {
  selectedMediaNode: MediaNode | null
  onSelectMediaNode: (node: MediaNode | null) => void
  mediaNodes: MediaNode[]
  isPreview: MediaPreviewState
  onPreview: (state: MediaPreviewState) => void

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
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  selectedMediaNode,
  onSelectMediaNode,
  mediaNodes,
  isPreview,
  onPreview,
  onDelete,
  onUpdate,
  onClone,
  onDownload
}) => {
  const handleDownload = () => {
    if (selectedMediaNode) {
      // call onDownload callback

      onDownload(selectedMediaNode.id)
    }
  }

  const handleDelete = () => {
    if (selectedMediaNode) {
      // call onDelete callback

      onDelete(selectedMediaNode.id)
      onSelectMediaNode(null)

      onPreview(false)
    }
  }

  const handleEdit = () => {
    if (selectedMediaNode) {
      // call onEdit callback

      onPreview('EDIT')
    }
  }

  const handleClone = () => {
    if (selectedMediaNode) {
      // call onClone callback

      onClone(selectedMediaNode.id)
    }
  }

  const handleUpdate = (
    data: Partial<
      MediaNode & {
        file: File
      }
    >
  ) => {
    if (selectedMediaNode) {
      // call onUpdate callback

      onUpdate(selectedMediaNode.id, data)
    }
  }

  const previewItemsLength = Math.min(mediaNodes.length, 9)

  return (
    <Modal
      isOpen={isPreview !== false}
      onClose={() => {
        onPreview(false)
      }}
      size="full"
      motionPreset="none">
      <ModalOverlay />

      <ModalContent
        overflow="hidden"
        containerProps={{
          id: 'coco'
        }}
        bg="transparent"
        sx={{
          '.react-transform-wrapper': {
            w: 'full',
            h: 'full',
            justifyContent: 'center',
            display: isPreview === 'PREVIEW' ? 'flex' : 'none'
          },
          '.react-transform-component': {
            w: 'full',
            h: 'full'
          }
        }}>
        <ModalHeader p="0">
          <HStack
            h="12"
            w="full"
            p="4"
            top="0"
            pos="sticky"
            zIndex="2"
            bg="bg.surface"
            borderBottom="1px solid"
            borderColor="border.emphasized">
            <Button
              variant="text"
              leftIcon={<FaArrowLeft />}
              onClick={() => {
                onPreview(false)
              }}>
              Back to media
            </Button>

            <Spacer />

            <Input
              key={selectedMediaNode?.description}
              size="xs"
              textAlign="center"
              border="none"
              fontSize="xs"
              fontWeight="bold"
              defaultValue={selectedMediaNode?.description}
              maxW="sm"
              onBlur={e => {
                handleUpdate({
                  description: e.target.value
                })
              }}
            />

            <Spacer />

            <ButtonGroup
              variant="outline"
              size="xs"
              isDisabled={selectedMediaNode === null}>
              <IconButton
                aria-label="Customize selected image"
                icon={<FaSlidersH />}
                onClick={handleEdit}
              />

              <IconButton
                aria-label="Clone selected image"
                icon={<FaClone />}
                onClick={handleClone}
              />

              <IconButton
                aria-label="Download selected image"
                icon={<FaDownload />}
                onClick={handleDownload}
              />
              <IconButton
                aria-label="Delete selected image"
                icon={<FaTrash />}
                onClick={handleDelete}
              />
            </ButtonGroup>
          </HStack>
        </ModalHeader>

        <ModalBody display="flex" h="calc(100dvh - 3rem - 6rem)" flex="unset">
          <TransformWrapper
            doubleClick={{
              mode: 'reset'
            }}>
            {({resetTransform}) => {
              useEffect(() => {
                resetTransform()
              }, [selectedMediaNode?.url])

              return (
                <TransformComponent>
                  <Image
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    src={selectedMediaNode?.url}
                    alt={selectedMediaNode?.description}
                  />
                </TransformComponent>
              )
            }}
          </TransformWrapper>

          {selectedMediaNode && isPreview === 'EDIT' && (
            <FilerobotImageEditor
              source={selectedMediaNode?.url}
              closeAfterSave
              onSave={async (editedImageObject, designState) => {
                editedImageObject.imageCanvas?.toBlob(blob => {
                  if (blob) {
                    const newFile = new File(
                      [blob],
                      editedImageObject.fullName ?? 'image.png',
                      {
                        type: blob.type
                      }
                    )

                    handleUpdate({
                      file: newFile
                    })
                  }
                })
              }}
              onBeforeSave={() => false}
              onClose={() => {
                onPreview('PREVIEW')
              }}
              annotationsCommon={{
                fill: '#ff0000'
              }}
              Rotate={{angle: 90, componentType: 'slider'}}
              Text={{text: 'Text...'}}
              tabsIds={[
                TABS.RESIZE,
                TABS.ADJUST,
                TABS.FILTERS,
                TABS.FINETUNE,
                TABS.ANNOTATE,
                TABS.WATERMARK
              ]}
              savingPixelRatio={0}
              previewPixelRatio={0}
            />
          )}
        </ModalBody>

        <ModalFooter p="0">
          <HStack
            h="24"
            w="full"
            p="4"
            justifyContent="center"
            bg="bg.surface"
            borderTop="1px solid"
            borderColor="border.emphasized">
            <IconButton
              variant="ghost"
              aria-label="Previous image"
              icon={<FaArrowLeft />}
              onClick={() => {
                // use previous image
                const currentIndex = mediaNodes.findIndex(
                  node => node.id === selectedMediaNode?.id
                )

                // make sure to loop around
                const previousIndex =
                  (currentIndex - 1 + mediaNodes.length) % mediaNodes.length

                const node = mediaNodes[previousIndex]

                if (node) {
                  onSelectMediaNode(node)
                }
              }}
            />

            <HStack>
              {[...Array(previewItemsLength)].map((_, index) => {
                const startIndex = mediaNodes.findIndex(
                  node => node.id === selectedMediaNode?.id
                )

                const offset = index - Math.floor(previewItemsLength / 2)
                const nodeIndex =
                  (startIndex + offset + mediaNodes.length) % mediaNodes.length

                const node = mediaNodes[nodeIndex]

                if (!node) {
                  return <Text>{nodeIndex}</Text>
                }

                return (
                  <AspectRatio
                    key={node.id}
                    ratio={node.width / node.height}
                    objectFit="contain"
                    w="16"
                    h="16"
                    {...(selectedMediaNode?.id === node.id && {
                      outline: '2px solid',
                      outlineColor: 'brand.500',
                      outlineOffset: '2px',
                      borderRadius: 'lg'
                    })}
                    onClick={() => {
                      onSelectMediaNode(node)
                    }}>
                    <Image
                      key={node.id}
                      id={index === 8 ? 'last-media-item' : undefined}
                      fallback={
                        <Skeleton
                          w="100%"
                          borderRadius="lg"
                          display="inline-block"
                        />
                      }
                      w="100%"
                      h="100%"
                      src={node.preview?.url ?? node.url}
                      alt={node.description}
                    />
                  </AspectRatio>
                )
              })}
            </HStack>

            <IconButton
              variant="ghost"
              aria-label="Next image"
              icon={<FaArrowRight />}
              onClick={() => {
                // use next image
                const currentIndex = mediaNodes.findIndex(
                  node => node.id === selectedMediaNode?.id
                )

                // make sure to loop around
                const nextIndex = (currentIndex + 1) % mediaNodes.length

                const node = mediaNodes[nextIndex]

                if (node) {
                  onSelectMediaNode(node)
                }
              }}
            />
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
