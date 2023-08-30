import {PageConfig, PageProps} from '@atsnek/jaen'
import {MdxField} from '@atsnek/jaen-fields-mdx'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  // const handle = location.pathname.split('/user/')[1];

  return <MdxField name="mdx-page" components={{}} />
}

export default Page

export const pageConfig: PageConfig = {
  label: 'MDX',
  icon: 'FaUser'
}
