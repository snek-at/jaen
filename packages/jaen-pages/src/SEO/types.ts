export interface Organization {
  name: string
  url: string
  logo: string
}

export interface SchemaOrg {
  title: string
  url: string
  author: {
    name: string
  }
  siteUrl: string
  datePublished: string | false
  defaultTitle: string
  description: string
  image: string
  isBlogPost: boolean
  organization: Organization
}
