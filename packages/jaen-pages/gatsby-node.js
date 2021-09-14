require('isomorphic-fetch')

const path = require('path')
const fs = require('fs')

const {createImages} = require('./dist/create-images')

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
      parent: JaenPageId
      children: [JaenPageId]
      fields: FieldType
    }

    type FieldType {
      _type: String
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
  `)
}

exports.createPages = async (
  {actions: {createPage, createNode}, createNodeId, cache, store, reporter},
  pluginOptions
) => {
  const templates = pluginOptions.templates
  const fileContent = JSON.parse(fs.readFileSync(jaenPagesPath, 'utf8'))

  for (const [id, pageEntity] of Object.entries(fileContent.pages)) {
    const {createdAt, fileUrl} = pageEntity.context
    const page = await (await fetch(fileUrl)).json()

    if (page.template) {
      let images = []
      const fields = page.fields

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
            fields: page.fields,
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
        fields: page.fields
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
    const internalComponentName = page.internalComponentName.replace(
      'Component',
      ''
    )

    const slug = page.path.replace('SitePage /', '')

    const newPage = {
      ...page,
      context: {
        ...page.context,
        jaenPageContext: {
          id,
          slug,
          ...cachedJaenPage,
          pageMetadata: {
            title: internalComponentName,
            datePublished: new Date().toISOString(),
            ...cachedJaenPage?.pageMetadata
          },
          images
        }
      }
    }

    createPage(newPage)
  }
}
