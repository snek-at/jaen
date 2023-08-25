import {CreateSchemaCustomizationArgs} from 'gatsby'

export const createSchemaCustomization = async ({
  actions
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(`
    type JaenData implements Node {
      patches: [JaenDataPatch!]!
      site: JSON
      pages: JSON
    }

    type JaenDataPatch {
      createdAt: Date!
      title: String!
      url: String!
    }
  `)
}
