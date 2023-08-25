import * as React from 'react'
import {Link, HeadFC, PageProps} from 'gatsby'
import {Field, PageConfig} from '@atsnek/jaen'

const BlogPage: React.FC<PageProps> = props => {
  return (
    <main>
      {JSON.stringify(props.pageContext)}
      <Field.Text name="title" defaultValue="Test12345" />
    </main>
  )
}

export default BlogPage

export const Head: HeadFC = () => <title>BlogPage</title>

export const pageConfig: PageConfig = {
  label: 'My Custom Blog Page',
  childTemplates: ['BlogPage']
}
