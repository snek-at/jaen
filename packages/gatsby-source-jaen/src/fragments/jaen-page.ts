import {graphql} from 'gatsby'

export const fragments = graphql`
  fragment JaenPageQuery on Query {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
    }
  }

  fragment JaenPageDataStructure on JaenPage {
    id
    buildPath
    slug
    template
    childTemplates
    excludedFromIndex
    jaenPageMetadata {
      title
      image
      description
      blogPost {
        date
        author
        category
      }
    }
  }

  fragment JaenPageChildrenData on JaenPage {
    ...JaenPageDataStructure
    jaenFields
  }

  fragment JaenPageData on JaenPage {
    id
    buildPath
    slug
    jaenFields
    excludedFromIndex
    template
    childTemplates
    parentPage {
      id
    }
    childPages {
      id
    }
    jaenPageMetadata {
      title
      image
      description
      blogPost {
        date
        author
        category
      }
    }

    mediaNodes {
      id
      description
      node {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: FULL_WIDTH
          )
        }
      }
    }

    sections {
      ...JaenSectionRecursive
    }
  }

  fragment JaenSectionRecursive on JaenSection {
    ...JaenSectionFields
    items {
      ...JaenSectionItemFields
      sections {
        ...JaenSectionFields
        items {
          ...JaenSectionItemFields
          sections {
            ...JaenSectionFields
            items {
              ...JaenSectionItemFields
              sections {
                ...JaenSectionFields
                items {
                  ...JaenSectionItemFields
                  sections {
                    ...JaenSectionFields
                    items {
                      ...JaenSectionItemFields
                      sections {
                        ...JaenSectionFields
                        items {
                          ...JaenSectionItemFields
                          sections {
                            ...JaenSectionFields
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment JaenSectionFields on JaenSection {
    fieldName
    ptrHead
    ptrTail
  }

  fragment JaenSectionItemFields on JaenSectionItem {
    id
    type
    ptrPrev
    ptrNext
    jaenFields
  }
`
