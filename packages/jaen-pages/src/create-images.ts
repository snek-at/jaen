import {
  createRemoteFileNode,
  CreateRemoteFileNodeArgs
} from 'gatsby-source-filesystem'

import {Field} from './types'

interface CreateImagesPayload {
  createNode: CreateRemoteFileNodeArgs['createNode']
  createNodeId: CreateRemoteFileNodeArgs['createNodeId']
  cache: CreateRemoteFileNodeArgs['cache']
  store: CreateRemoteFileNodeArgs['store']
  reporter: CreateRemoteFileNodeArgs['reporter']
  fields: {[fieldName: string]: Field}
  pageId: string
}

export const createImages = async ({
  fields,
  pageId,
  ...createFnArgs
}: CreateImagesPayload) => {
  const images = []

  if (fields) {
    for (const [fieldName, field] of Object.entries(fields)) {
      if (field._type === 'PlainField') {
        const content = field.content

        if (content._type === 'ImageBlock') {
          // check if content.src is a url
          const url = content.src
          if (url.startsWith('http')) {
            let fileNode = await createRemoteFileNode({
              url,
              parentNodeId: pageId,
              ...createFnArgs
            })

            if (fileNode) {
              images.push({
                id: {
                  pageId,
                  fieldName
                },
                file___NODE: fileNode.id
              })
            }
          }
        }
      } else if (field._type === 'BlocksField') {
        for (const [position, block] of Object.entries(field.blocks)) {
          for (const [blockFieldName, contentBlock] of Object.entries(
            block.fields
          )) {
            if (contentBlock._type === 'ImageBlock') {
              // check if content.src is a url
              const url = contentBlock.src
              if (url.startsWith('http')) {
                let fileNode = await createRemoteFileNode({
                  url,
                  parentNodeId: pageId,
                  ...createFnArgs
                })

                if (fileNode) {
                  images.push({
                    id: {
                      pageId,
                      fieldName,
                      block: {
                        position: parseInt(position),
                        fieldName: blockFieldName
                      }
                    },
                    file___NODE: fileNode.id
                  })
                }
              }
            }
          }
        }
      }
    }
  }

  return images
}
