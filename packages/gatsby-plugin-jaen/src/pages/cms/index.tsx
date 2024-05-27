import {PageConfig, useAuth} from '@atsnek/jaen'
import {PageProps, graphql, useStaticQuery} from 'gatsby'

import {Dashboard} from '../../components/cms/Dashboard'
import {CMSManagement, useCMSManagement} from '../../connectors/cms-management'

const DashboardPage: React.FC<PageProps> = () => {
  const auth = useAuth()

  const manager = useCMSManagement()

  const {
    jaenData: {patches}
  } = useStaticQuery<{
    jaenData: {
      patches: Array<{
        createdAt: string
        url: string
        title: string
      }>
    }
  }>(graphql`
    query {
      jaenData {
        patches {
          createdAt
          url
          title
        }
      }
    }
  `)

  return (
    <Dashboard
      user={auth.user?.profile?.given_name || auth.user?.profile?.sub}
      isPublishing={manager.isPublishing}
      patches={patches}
    />
  )
}

const Page: React.FC<PageProps> = props => {
  return (
    <CMSManagement>
      <DashboardPage {...props} />
    </CMSManagement>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Jaen CMS',
  icon: 'FaTachometerAlt',
  menu: {
    type: 'app',
    group: 'cms',
    label: 'Dashboard',
    groupLabel: 'Jaen CMS',
    order: 100
  },
  breadcrumbs: [
    {
      label: 'CMS',
      path: '/cms/'
    }
  ],
  withoutJaenFrameStickyHeader: true,
  auth: {
    isAdminRequired: true
  },
  layout: {
    name: 'jaen'
  }
}

export {Head} from '@atsnek/jaen'
