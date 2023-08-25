import {CreateSchemaCustomizationArgs} from 'gatsby'

export const createSchemaCustomization = async ({
  actions
}: CreateSchemaCustomizationArgs) => {
  actions.createTypes(`
    type JaenSite implements Node {
      siteMetadata: JaenSiteMetadata
    }

    type JaenSiteMetadata {
      siteUrl: String
      title: String
      description: String
      image: String
      author: JaenSiteMetadataAuthor
      organization: JaenSiteMetadataOrganization
      social: JaenSiteMetadataSocial
    }
    
    type JaenSiteMetadataAuthor {
      name: String
    }

    type JaenSiteMetadataOrganization {
      name: String
      url: String
      logo: String
    }

    type JaenSiteMetadataSocial {
      twitter: String
      fbAppID: String
    }
  `)
}
