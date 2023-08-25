import {CreateSchemaCustomizationArgs} from 'gatsby'

export const createSchemaCustomization = async ({
  actions
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(`
    type JaenTemplate implements Node {
      id: ID!
      absolutePath: String!
      relativePath: String!
      label: String!
      childTemplates: [JaenTemplate!]! @link
    } 
  `)
}
