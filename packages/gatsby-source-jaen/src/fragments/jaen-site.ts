import {graphql} from 'gatsby'

export const fragments = graphql`
  fragment JaenSiteMetadataData on JaenSiteMetadata {
    siteUrl
    title
    description
    image
    author {
      name
    }
    organization {
      name
      url
      logo
    }
    social {
      twitter
      fbAppID
    }
  }
`
