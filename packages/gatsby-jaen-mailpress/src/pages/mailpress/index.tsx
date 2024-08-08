import {PageConfig, PageProps} from '@atsnek/jaen'
import {useEffect} from 'react'
import {navigate} from 'gatsby'

const Page: React.FC<PageProps> = ({}) => {
  // redirect to ./templates
  useEffect(() => {
    navigate('./templates')
  }, [])

  return null
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Templates',
  layout: {
    name: 'jaen'
  },
  breadcrumbs: [
    {
      label: 'Mailpress',
      path: '/mailpress/'
    }
  ],
  auth: {
    isRequired: true,
    isAdminRequired: true
  }
}
