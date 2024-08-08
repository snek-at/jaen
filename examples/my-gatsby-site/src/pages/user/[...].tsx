import {PageConfig, PageProps} from '@atsnek/jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  // const handle = location.pathname.split('/user/')[1];

  return null
}

export default Page

export const pageConfig: PageConfig = {
  label: 'User [...]',
  icon: 'FaUser',
  breadcrumbs: [
    {
      label: 'schettn',
      path: '/user/schettn/'
    }
  ],
  menu: {
    type: 'user',
    label: 'Your profile'
  }
}
