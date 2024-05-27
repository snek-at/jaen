import {CreateSchemaCustomizationArgs, Node} from 'gatsby'

export const createSchemaCustomization = async ({
  actions
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(`
    type JaenPage implements Node {
      id: ID!
      slug: String!
      jaenPageMetadata: JaenPageMetadata!
      jaenFields: JSON
      mediaNodes: [MediaNode!]! @mediaNodes

      sections: [JaenSection!]!

      template: String

      buildPath: String @buildPath
      excludedFromIndex: Boolean
      
      pageConfig: JSON

      parentPage: JaenPage @link
      childPages: [JaenPage!]! @childPages
      childPagesOrder: [String!]!

      createdAt: Date!
      modifiedAt: Date!
    }

    type MediaNode implements Node {
        id: ID!
        jaenPageId: String
        description: String!
        node: File! @link
    }

    type JaenSection {
      fieldName: String!
      items: [JaenSectionItem!]!
      ptrHead: String
      ptrTail: String
    }

    type JaenSectionItem {
      id: ID!
      type: String!
      ptrPrev: String
      ptrNext: String
      jaenFields: JSON

      sections: [JaenSection!]!
    }

    type JaenSectionPath {
      fieldName: String!
      sectionId: String
    }

    type JaenPageMetadata {
      title: String!
      description: String
      image: String
      blogPost: JaenPageMetadataBlogPost
    }

    type JaenPageMetadataBlogPost {
      date: String
      author: String
      category: String
    }
  `)

  actions.createFieldExtension({
    name: 'buildPath',
    args: {},
    extend(_options: any, _prevFieldConfig: any) {
      return {
        args: {},
        async resolve(
          source: Node & {
            slug: string
            parentPage: string | null
          },
          _args: any,
          context: any,
          _info: any
        ) {
          const {entries} = await context.nodeModel.findAll({
            type: 'SitePage'
          })

          const pages = entries.filter(
            (entry: any) => entry.context.jaenPageId === source.id
          )

          const pagesArr: any[] = Array.from(pages)

          if (pagesArr.length > 0) {
            return pagesArr[0].path
          }
        }
      }
    }
  })

  actions.createFieldExtension({
    name: 'childPages',
    args: {},
    extend(_options: any, _prevFieldConfig: any) {
      return {
        args: {},
        async resolve(
          source: Node & {
            slug: string
            parentPage: string | null
          },
          _args: any,
          context: any,
          _info: any
        ) {
          const {entries} = await context.nodeModel.findAll({
            type: 'JaenPage',
            query: {
              filter: {
                parentPage: {
                  id: {
                    eq: source.id
                  }
                }
              }
            }
          })

          return entries
        }
      }
    }
  })

  actions.createFieldExtension({
    name: 'mediaNodes',
    args: {},
    extend(_options: any, _prevFieldConfig: any) {
      return {
        args: {},
        async resolve(
          source: Node & {
            slug: string
            parentPage: string | null
          },
          _args: any,
          context: any,
          _info: any
        ) {
          const {entries} = await context.nodeModel.findAll({
            type: 'MediaNode',
            query: {
              filter: {
                jaenPageId: {
                  eq: source.id
                }
              }
            }
          })

          return entries
        }
      }
    }
  })
}
