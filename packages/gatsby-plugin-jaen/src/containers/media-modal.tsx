import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'
import {JaenPage, MediaNode, PageProvider, useMediaModal} from 'jaen'
import {useEffect, useState} from 'react'

import Media from './media'

export interface MediaSelectorProps {
  isSelector?: boolean
  defaultSelected?: string
  jaenPageId?: string
  onSelect: (mediaNode: MediaNode) => void
}

const MediaModal: React.FC<MediaSelectorProps> = props => {
  const context = useMediaModal()

  const [jaenPage, setJaenPage] = useState<
    {
      id: string
    } & Partial<JaenPage>
  >({
    id: 'JaenPage /cms/media/'
  })

  useEffect(() => {
    const fn = async () => {
      // load jaenPage
      const data = await fetch('/page-data/cms/media/page-data.json')

      const json = await data.json()

      setJaenPage(json.result.data.jaenPage as JaenPage)
    }

    if (context.isOpen) {
      fn()
    }
  }, [context.isOpen])

  return (
    <Modal isOpen={context.isOpen} onClose={context.toggleModal}>
      <ModalOverlay />
      <ModalContent
        maxW="96rem"
        containerProps={{
          id: 'coco'
        }}>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody p="1">
          <PageProvider jaenPage={jaenPage}>
            <Media
              isSelector={props.isSelector}
              onSelect={props.onSelect}
              defaultSelected={props.defaultSelected}
              jaenPageId={props.jaenPageId}
            />
          </PageProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MediaModal
