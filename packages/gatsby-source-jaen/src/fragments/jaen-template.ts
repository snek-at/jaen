import {graphql} from 'gatsby'

export const fragments = graphql`
  fragment JaenTemplateData on JaenTemplate {
    id
    label
    childTemplates {
      id
      label
    }
  }
`
