import {getImage, IGatsbyImageData} from 'gatsby-plugin-image'
import {usePageContext} from '../../../contexts/page'

export interface UsePageImageReturn {
  image: IGatsbyImageData
  description: string
}

/**
 * Retrieves an image for a given ID from the page or section context and generates an IGatsbyImageData object.
 *
 * @param id - The ID of the image media node to retrieve.
 * @returns The IGatsbyImageData object representing the image or undefined if not found.
 */
export const usePageImage = (id: string): UsePageImageReturn | undefined => {
  // Get the current page context from the Jaen CMS.
  const {jaenPage} = usePageContext()

  const file = jaenPage?.mediaNodes?.find(node => node.id === id)

  if (file) {
    const image = getImage(file.node.childImageSharp.gatsbyImageData)

    // If a valid file is found, generate the IGatsbyImageData object using Gatsby's 'getImage' function.
    if (image) {
      return {
        image,
        description: file.description
      }
    }
  }

  return undefined
}
