import {Box, Button, Center, IconButton, Text} from '@chakra-ui/react'
import {GatsbyImage, getSrc} from 'gatsby-plugin-image'
import {CSSProperties, forwardRef, ReactEventHandler} from 'react'
import {FaImage, FaTrashAlt} from 'react-icons/fa'
import {PhotoProvider, PhotoView} from 'react-photo-view'

import {connectField} from '../../connectors'
import {useMediaModal} from '../../contexts/media-modal'
import {useNotificationsContext} from '../../contexts/notifications'
import {PageProvider, usePageContext} from '../../contexts/page'
import {HighlightTooltip} from '../components/HighlightTooltip'
import {useImage} from './hooks/use-image'

export interface ImageProps {
  alt?: string
  className?: string
  style?: CSSProperties
  imgClassName?: string
  imgStyle?: CSSProperties
  backgroundColor?: string
  objectFit?: CSSProperties['objectFit']
  objectPosition?: CSSProperties['objectPosition']
  onLoad?: (props: {wasCached: boolean}) => void
  onError?: ReactEventHandler<HTMLImageElement>
  onStartLoad?: (props: {wasCached: boolean}) => void
}

export interface ImageFieldProps extends ImageProps {
  lightbox?: boolean
  /**
   * When true, the image will be displayed in a lightbox along with other images in the same group.
   * Thus it is required to wrap the image in a `PhotoProvider` component.
   *
   * @example
   * ```tsx
   *
   * import {Field, PhotoProvider} from '@atsnek/jaen'
   *
   * <PhotoProvider maskOpacity={0.8}>
   *  <Field.Image ... lightboxGroup />
   *  <Field.Image ... lightboxGroup />
   * </PhotoProvider>
   * ```
   */
  lightboxGroup?: boolean
  defaultValue?: string
  /**
   * When true, the unoptimized image will be rendered after the optimized image.
   * This is useful when you want to display a GIF image.
   *
   * @example
   * ```tsx
   * import {Field} from '@atsnek/jaen'
   *
   * <Field.Image ... overload defaultValue="https://i.giphy.com/media/duzpaTbCUy9Vu/giphy.webp" />
   * ```
   *
   * In this example, the GIF image will be displayed after the optimized image (no GIF).
   */
  overload?: boolean
}

export type ImageFieldMediaId = string

export const ImageField = connectField<ImageFieldMediaId, ImageFieldProps>(
  ({
    jaenField,
    lightbox,
    lightboxGroup,
    defaultValue,
    overload,
    ...imageProps
  }) => {
    const isLightbox = lightbox && !jaenField.isEditing

    let mediaId = jaenField.value

    if (mediaId === undefined) {
      mediaId = jaenField.staticValue
    }

    const {jaenPage} = usePageContext()

    const context = useMediaModal({
      jaenPageId: jaenPage.id,
      onSelect: media => {
        jaenField.onUpdateValue(media.id)
      }
    })

    const {confirm} = useNotificationsContext()

    const handleRemove = async () => {
      const ok = await confirm({
        title: 'Remove Image',
        message: 'Are you sure you want to remove this image?'
      })

      if (ok) {
        jaenField.onUpdateValue(null as any)
      }
    }

    return (
      <HighlightTooltip
        id={jaenField.id || jaenField.name}
        isEditing={jaenField.isEditing}
        boxSize="full"
        actions={[
          <Button
            variant="field-highlighter-tooltip"
            leftIcon={<FaImage />}
            onClick={() => {
              context.toggleModal({defaultSelected: mediaId})
            }}>
            Image
          </Button>,

          <IconButton
            variant="field-highlighter-tooltip"
            aria-label="Remove"
            icon={<FaTrashAlt />}
            onClick={handleRemove}
          />
        ]}>
        <PageProvider
          jaenPage={{
            id: 'JaenPage /cms/media/',
            mediaNodes: jaenPage.mediaNodes || []
          }}>
          <ImageComponent
            mediaId={mediaId}
            fieldName={jaenField.name}
            imageProps={imageProps}
            lightbox={isLightbox}
            lightboxGroup={lightboxGroup}
          />
        </PageProvider>
      </HighlightTooltip>
    )
  },
  {
    fieldType: 'IMA:ImageField'
  }
)

const ImageComponent = forwardRef<
  HTMLDivElement,
  {
    mediaId?: ImageFieldMediaId
    fieldName: string
    imageProps?: ImageProps

    lightbox?: boolean
    lightboxGroup?: boolean
  }
>((props, ref) => {
  const image = useImage(props.mediaId || '')

  if (!image) {
    return (
      <Center
        ref={ref}
        boxSize="full"
        pos={'relative'}
        overflow="hidden"
        style={props.imageProps?.style}>
        <Text color="gray.600" fontSize="sm">
          No image
        </Text>
      </Center>
    )
  }

  let element = (
    <Box
      ref={ref}
      boxSize="full"
      pos={'relative'}
      overflow="hidden"
      cursor={props.lightbox ? 'zoom-in' : 'default'}>
      <GatsbyImage
        image={image.image}
        alt={image.description}
        {...props.imageProps}
        style={{
          ...props.imageProps?.style,
          width: '100%',
          height: '100%'
        }}
      />
    </Box>
  )

  if (props.lightbox) {
    const src = getSrc(image.image)

    element = <PhotoView src={src}>{element}</PhotoView>

    if (!props.lightboxGroup) {
      element = (
        <PhotoProvider maskOpacity={0.8}>
          <PhotoView src={src}>{element}</PhotoView>
        </PhotoProvider>
      )
    }
  }

  return element
})
