import {Box, Image, useDisclosure} from '@chakra-ui/react'
import loadable from '@loadable/component'
import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData
} from 'gatsby-plugin-image'
import * as React from 'react'

const SnekFinder = loadable(() => import('@containers/SnekFinder'))

export type ImageType = {
  src: string
  title: string
  alt: string
}

export interface JaenImageProps
  extends Omit<
    GatsbyImageProps,
    'imgClassName' | 'imgStyle' | 'alt' | 'image'
  > {
  alt?: string
}

export type JaenImage = {
  initialImage: ImageType
  storeImage?: ImageType
  contextImage?: IGatsbyImageData
  editable?: boolean
  onChange: (image: ImageType) => void
  imageProps: JaenImageProps
}

const JaenImage: React.FC<JaenImage> = ({
  editable = false,
  initialImage,
  storeImage,
  contextImage,
  ...props
}) => {
  const fileSelector = useDisclosure()

  const handleFileClick = () => {
    if (editable) {
      fileSelector.onOpen()
    }
  }

  const image = storeImage || initialImage

  const editingStyle = editable
    ? {
        cursor: 'pointer',
        boxShadow: '0 0 0 2.5px #48BB78',
        transition: 'box-shadow 0.1s ease-in-out'
      }
    : {}

  const imageProps = {
    ...props.imageProps,
    style: {...props.imageProps.style, ...editingStyle}
  }

  return (
    <>
      <div onClick={handleFileClick}>
        {storeImage || !contextImage ? (
          <Image {...imageProps} {...image} />
        ) : (
          <GatsbyImage
            image={contextImage}
            title={image.title}
            alt={image.alt}
            {...imageProps}
          />
        )}
      </div>
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
    </>
  )
}

export default JaenImage
