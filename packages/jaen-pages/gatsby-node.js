require('isomorphic-fetch')

const path = require('path')
const fs = require('fs')

const {createImages} = require('./dist/create-images')

const jaenPagesPath = path.resolve('./jaen-pages.json')

const jaenPagesFileObj = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))

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
      parent: JaenPageId
      children: [JaenPageId]
      fields: JSON
    }

    type JaenPageId {
      id: String!
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

    type JaenPagesInitials implements Node {
      snekFinder: JaenPagesSnekFinder!
    }

    type JaenPagesSnekFinder {
      initBackendLink: String
    }
  `)
}

exports.createPages = async (
  {actions: {createPage, createNode}, createNodeId, cache, store, reporter},
  pluginOptions
) => {
  const templates = pluginOptions.templates

  for (const [id, pageEntity] of Object.entries(jaenPagesFileObj.pages)) {
    const {createdAt, fileUrl} = pageEntity.context
    const page = await (await fetch(fileUrl)).json()
    const fields = page.fields

    if (page.template) {
      let images = []

      if (fields) {
        images = await createImages({
          createNode,
          createNodeId,
          cache,
          store,
          reporter,
          fields,
          pageId: id
        })
      }

      createPage({
        path: page.path || `${id}/`,
        component: path.resolve(templates[page.template]),
        context: {
          jaenPageContext: {
            id,
            parent: page.parent,
            children: page.children,
            slug: page.slug,
            template: page.template,
            pageMetadata: {
              datePublished: createdAt,
              ...page.pageMetadata
            },
            fields: JSON.stringify(fields),
            images
          }
        }
      })
    } else {
      await cache.set(`jaen-static-page-${id}`, {
        id,
        slug: page.slug,
        template: page.template,
        parent: page.parent,
        children: page.children,
        pageMetadata: {
          datePublished: createdAt,
          ...page.pageMetadata
        },
        fields
      })
    }
  }
}

exports.onCreatePage = async ({
  page,
  actions: {createPage, deletePage, createNode},
  createNodeId,
  cache,
  store,
  reporter
}) => {
  const {jaenPageContext} = page.context

  const id = `SitePage ${page.path}`
  const cachedJaenPage = await cache.get(`jaen-static-page-${id}`)

  if (!jaenPageContext?.template) {
    deletePage(page)

    let images = []

    const fields = cachedJaenPage?.fields

    if (fields) {
      images = await createImages({
        createNode,
        createNodeId,
        cache,
        store,
        reporter,
        fields,
        pageId: id
      })
    }

    // replace 'Component' from page.internalComponentName with ''
    // replace all '/' with ''
    // capitalize first letter
    let internalComponentName = page.internalComponentName
      .replace('Component', '')
      .replace(/\//g, '')

    internalComponentName =
      internalComponentName.charAt(0).toUpperCase() +
      internalComponentName.slice(1)

    const parts = page.path.split('/')
    const slug = parts[parts.length - 1] || parts[parts.length - 2] || undefined

    const newPage = {
      ...page,
      context: {
        ...page.context,
        jaenPageContext: {
          id,
          ...cachedJaenPage,
          slug: cachedJaenPage?.slug || slug,
          pageMetadata: {
            title: internalComponentName,
            datePublished: new Date().toISOString(),
            ...cachedJaenPage?.pageMetadata
          },
          images,
          fields: JSON.stringify(fields)
        }
      }
    }

    createPage(newPage)
  }
}

exports.sourceNodes = ({actions, createNodeId, createContentDigest}) => {
  const {createNode} = actions

  // Data can come from anywhere, but for now create it manually
  const myData = {
    snekFinder: {
      initBackendLink: jaenPagesFileObj?.snekFinder?.context?.fileUrl
    }
  }

  const nodeContent = JSON.stringify(myData)

  const nodeMeta = {
    id: createNodeId('jaen-pages-snek-finder'),
    parent: null,
    children: [],
    internal: {
      type: `JaenPagesInitials`,
      content: nodeContent,
      contentDigest: createContentDigest(myData)
    }
  }

  const node = Object.assign({}, myData, nodeMeta)
  createNode(node)
}
