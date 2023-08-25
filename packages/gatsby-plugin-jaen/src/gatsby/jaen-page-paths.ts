import {graphql, useStaticQuery} from 'gatsby'

export const useJaenPagePaths = () => {
  return useStaticQuery<{
    allJaenPage: {
      nodes: Array<{
        id: string
        parentPage: {
          id: string
        }
        slug: string
        buildPath: string
        template: string | null
      }>
    }
    allJaenTemplate: {
      nodes: Array<{
        id: string
        absolutePath: string
        relativePath: string
      }>
    }
  }>(graphql`
    query {
      allJaenPage {
        nodes {
          id
          slug
          parentPage {
            id
          }
          buildPath
          template
        }
      }
      allJaenTemplate {
        nodes {
          id
          absolutePath
          relativePath
        }
      }
    }
  `)
}
