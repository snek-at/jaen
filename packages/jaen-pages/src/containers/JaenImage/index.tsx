import {Box, Image, useDisclosure} from '@chakra-ui/react'
import {
  GatsbyImage,
  GatsbyImageProps,
  IGatsbyImageData
} from 'gatsby-plugin-image'
import * as React from 'react'

import SnekFinder from '../SnekFinder'
import {JaenImageContainer} from './style'

export type InitialImageType = {
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
  initialImage: InitialImageType
  gatsbyImage?: IGatsbyImageData
  editable?: boolean
  onChange: (image: InitialImageType) => void
  imageProps: JaenImageProps
}

const JaenImage: React.FC<JaenImage> = ({
  editable = false,
  initialImage,
  gatsbyImage,
  ...props
}) => {
  const fileSelector = useDisclosure()
  const [isInitialImage, setIsInitalImage] = React.useState<boolean>(
    !gatsbyImage
  )

  console.log('[JaenImage]', isInitialImage)

  const handleFileClick = () => {
    if (editable) {
      fileSelector.onOpen()
    }
  }

  return (
    <>
      <JaenImageContainer editable={editable} onClick={handleFileClick}>
        {isInitialImage ? (
          <Image {...props.imageProps} {...initialImage} />
        ) : (
          <>
            {gatsbyImage && (
              <GatsbyImage
                image={gatsbyImage}
                title={initialImage.title}
                alt={initialImage.alt}
                {...props.imageProps}
              />
            )}
          </>
        )}
      </JaenImageContainer>
      {fileSelector.isOpen && (
        <SnekFinder
          mode="selector"
          onSelectorClose={fileSelector.onClose}
          onSelectorSelect={i => {
            setIsInitalImage(true)

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
