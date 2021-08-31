import {Image, useDisclosure} from '@chakra-ui/react'
import * as React from 'react'

import {useTemplate} from '../../contexts/template'
import {DesignProvider} from '../../tools/chakra-ui'
import SnekFinder from '../SnekFinder'

export type ImageType = {
  src: string
  title: string
  alt: string
}

export type ImageProps = {
  initialImage: ImageType
  width: number | undefined
  height: number | undefined
  editable?: boolean
  onChange: (image: ImageType) => void
}

const JaenImage: React.FC<ImageProps> = ({editable = false, ...props}) => {
  const [initialImage, setInitialImage] = React.useState(props.initialImage)

  const fileSelector = useDisclosure()
  const {pageId} = useTemplate()

  const handleFileClick = () => {
    fileSelector.onOpen()
  }

  React.useEffect(() => {
    setInitialImage(props.initialImage)
  }, [props.initialImage])

  let image

  if (editable) {
    image = (
      <Image
        src={initialImage.src}
        title={initialImage.title}
        alt={initialImage.alt}
        width={props.width}
        height={props.height}
        transition="0.2s all"
        objectFit="cover"
        _hover={
          editable ? {filter: 'brightness(70%)', cursor: 'pointer'} : undefined
        }
        onClick={handleFileClick}
      />
    )
  } else {
    image = (
      <Image
        placeholder="blurred"
        layout="fixed"
        objectFit="cover"
        src={initialImage.src}
        title={initialImage.title}
        alt={initialImage.alt}
        width={props.width}
        height={JSON.parse(JSON.stringify(props.height))}
      />
    )
  }

  return (
    <DesignProvider>
      {image}
      {fileSelector.isOpen && (
        <SnekFinder
          mode="selector"
          onSelectorClose={fileSelector.onClose}
          onSelectorSelect={i => {
            props.onChange({
              src: i.src,
              title: i.title,
              alt: i.description
            })

            fileSelector.onClose()
          }}
        />
      )}
    </DesignProvider>
  )
}

export default JaenImage
