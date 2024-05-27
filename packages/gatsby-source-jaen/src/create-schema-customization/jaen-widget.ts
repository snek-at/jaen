import {CreateSchemaCustomizationArgs} from 'gatsby'

export const createSchemaCustomization = async ({
  actions
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(`
  type JaenWidget implements Node {
    name: String!
    createdAt: Date!
    modifiedAt: Date!
    data: JSON
  }
  `)
}
