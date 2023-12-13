import * as React from 'react'
import {Link, HeadFC, PageProps, navigate} from 'gatsby'
import {Field, PageConfig, useField, useJaenPageIndex} from '@atsnek/jaen'
import {Button} from '@chakra-ui/react'

const BlogPage: React.FC<PageProps> = props => {
  const index = useJaenPageIndex()

  console.log('index', index)

  const field = useField('link', 'IMA:TextField')

  return (
    <main>
      {JSON.stringify(props.pageContext)}
      <Field.Text name="title" defaultValue="Test12345" />

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
    </main>
  )
}

export default BlogPage

export const Head: HeadFC = () => <title>BlogPage</title>

export const pageConfig: PageConfig = {
  label: 'My Custom Blog Page',
  childTemplates: ['BlogPage']
}
