require('isomorphic-fetch')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

const path = require('path')
const fs = require('fs')

const jaenPagesPath = path.resolve('./jaen-pages.json')

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions
  createTypes(`
    type SitePage implements Node {
      context: SitePageContext
    }

    type SitePageContext {
      jaenPageContext: JaenPageContext!
    }

    type JaenPageContext {
      id: String!
      slug: String
      template: String
      pageMetadata: JaenPageMetadata!
      images: [JaenPagesFile] 
    }

    type JaenPagesFile {
      id: JaenPagesId
      file: File @link(from: "file___NODE")
    }

    type JaenPagesId {
      pageId: String!
      fieldName: String!
      block: JaenPagesBlock
    }

    type JaenPagesBlock {
      position: Int!
      fieldName: String!
    }

    type JaenPageMetadata {
      title: String!
      description: String
      image: String
      canonical: String
      datePublished: String
      isBlogPost: Boolean
    }

  
  `)
}

exports.createPages = async ({actions, graphql, cache}, pluginOptions) => {
  const templates = pluginOptions.templates
  const fileContent = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))

  for (const [id, pageEntity] of Object.entries(fileContent.pages)) {
    const {createdAt, fileUrl} = pageEntity.context
    const page = await (await fetch(fileUrl)).json()

    if (page.template) {
      actions.createPage({
        path: page.path || `${id}/`,
        parent: page.parent ? page.parent.id : null,
        children: page.children.map(child => child.id),
        component: path.resolve(templates[page.template]),
        context: {
          jaenPageContext: {
            id,
            slug: page.slug,
            template: page.template,
            pageMetadata: {
              datePublished: createdAt,
              ...page.pageMetadata
            },
            fields: page.fields
          }
        }
      })
    } else {
      await cache.set(`jaen-static-page-context-${id}`, {
        id,
        slug: page.slug,
        template: page.template,
        pageMetadata: {
          datePublished: createdAt,
          ...page.pageMetadata
        }
      })
    }
  }
}

exports.onCreatePage = async ({cache, page, actions, store}) => {
  const {createPage, deletePage} = actions

  const {jaenPageContext} = page.context

  const id = `SitePage ${page.path}`
  const cachedjaenPageContext = await cache.get(
    `jaen-static-page-context-${id}`
  )

  if (!jaenPageContext?.template) {
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        jaenPageContext: {
          id,
          ...cachedjaenPageContext,
          pageMetadata: {
            title: page.internalComponentName,
            datePublished: new Date().toISOString(),
            ...cachedjaenPageContext?.pageMetadata
          }
        }
      }
    })
  }

  // console.log('[onCreatePage] ', jaenPageContext)

  // const fields = jaenPageContext.fields

  // if (fields) {
  //   for (const [fieldName, field] of Object.entries(fields)) {
  //     const content = field.content

  //     if (field._type === 'PlainField') {
  //       if (content._type === 'ImageBlock') {
  //         const url = content.src

  //         let fileNode = await createRemoteFileNode({
  //           url: content.src, // string that points to the URL of the image
  //           parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
  //           createNode, // helper function in gatsby-node to generate the node
  //           createNodeId, // helper function in gatsby-node to generate the node id
  //           cache, // Gatsby's cache
  //           store // Gatsby's Redux store
  //         })
  //       }
  //     } else if (field._type === 'BlocksField') {
  //     }
  //   }
  // }
}

exports.onCreateNode = async ({
  node,
  actions: {createNode},
  store,
  cache,
  createNodeId
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === 'SitePage') {
    const {jaenPageContext} = node.context
    const fields = jaenPageContext?.fields
    const images = []

    if (fields) {
      for (const [fieldName, field] of Object.entries(fields)) {
        const content = field.content

        if (field._type === 'PlainField') {
          if (content._type === 'ImageBlock') {
            let fileNode = await createRemoteFileNode({
              url: content.src, // string that points to the URL of the image
              parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
              createNode, // helper function in gatsby-node to generate the node
              createNodeId, // helper function in gatsby-node to generate the node id
              cache, // Gatsby's cache
              store // Gatsby's Redux store
            })

            if (fileNode) {
              images.push({
                id: {
                  pageId: jaenPageContext.id,
                  fieldName
                },
                file___NODE: fileNode.id
              })
            }
          }
        } else if (field._type === 'BlocksField') {
        }
      }
    }

    if (images.length > 0) {
      node.context.jaenPageContext.images = images
    }
  }
}
