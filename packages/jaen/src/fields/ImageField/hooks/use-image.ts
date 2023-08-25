import {useEffect, useState} from 'react'

import {useField} from '../../../hooks/use-field'
import {MediaNode} from '../../../types'
import {ImageFieldMediaId} from '../ImageField'
import {usePageImage, UsePageImageReturn} from './use-page-image'

/**
 * Retrieves an image for a given mediaId and generates an IGatsbyImageData object.
 *
 * @param mediaId - The ID of the image media node to retrieve.
 * @param byFieldName - (Optional) The field name to look for the media node in page context or section context.
 * @returns The IGatsbyImageData object representing the image or undefined if not found.
 */
export const useImage = (
  mediaId: ImageFieldMediaId
): UsePageImageReturn | undefined => {
  // Get the statically-defined image from the current page context or section context.
  const staticImage = usePageImage(mediaId)

  // Get the dynamic image data from the 'media_nodes' field of the page context.
  const field = useField<{[id: string]: MediaNode}>(
    'media_nodes',
    'IMA:MEDIA_NODES'
  )

  const [image, setImage] = useState<UsePageImageReturn | undefined>(
    staticImage
  )

  useEffect(() => {
    const mediaNode = field.value?.[mediaId]

    // If a dynamic media node is available, create the IGatsbyImageData object with the media node's details.
    if (mediaNode) {
      setImage({
        image: {
          placeholder: {
            fallback: mediaNode.preview?.url
          },
          layout: 'constrained',
          images: {
            fallback: {
              src: mediaNode.url
            }
          },
          width: mediaNode.width,
          height: mediaNode.height
        },
        description: mediaNode.description || ''
      })
    } else {
      setImage(staticImage)
    }

    if (!mediaId) {
      setImage(undefined)
    }
  }, [field.value, mediaId])

  return image
}
