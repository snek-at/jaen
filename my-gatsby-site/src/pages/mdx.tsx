import {PageConfig, PageProps} from '@atsnek/jaen'
import {MdxField} from '@atsnek/jaen-fields-mdx'
import {Link} from 'gatsby-plugin-jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  // const handle = location.pathname.split('/user/')[1];

  return (
    <>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <MdxField name="mdx-page" components={{}} />
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'MDX',
  icon: 'FaUser'
}
