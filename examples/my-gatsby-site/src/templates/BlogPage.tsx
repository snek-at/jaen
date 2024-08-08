import * as React from 'react'
import {Link, HeadFC, PageProps, navigate, graphql} from 'gatsby'
import {Field, PageConfig, useField, useJaenPageIndex} from '@atsnek/jaen'
import {Button} from '@chakra-ui/react'
import {MdxField} from '@atsnek/jaen-fields-mdx'

const BlogPage: React.FC<PageProps> = props => {
  const index = useJaenPageIndex()

  console.log('index', index)

  const field = useField('link', 'IMA:TextField')

  React.useEffect(() => {
    alert('page mounted')
  }, [])

  return (
    <main>
      {JSON.stringify(props.pageContext)}
      <Field.Text name="text" defaultValue="Test12345" />

      <Field.Text name="link" defaultValue="/" />

      <Button
        onClick={() => {
          navigate(field.value)
        }}>
        Navigate
      </Button>

      <pre style={{whiteSpace: 'pre-wrap'}}>
        {JSON.stringify(index, null, 2)}
      </pre>

      <Field.Image name="image" className="test1234" />

      <MdxField
        components={{
          Text: () => {
            return <Field.Text name="text" defaultValue="default text" />
          }
        }}
      />
    </main>
  )
}

export default BlogPage

export const pageConfig: PageConfig = {
  label: 'My Custom Blog Page',
  childTemplates: ['BlogPage']
}

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`

export {Head} from '@atsnek/jaen'
