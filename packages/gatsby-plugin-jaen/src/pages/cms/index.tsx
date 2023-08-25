import {PageConfig, useAuthenticationContext} from '@atsnek/jaen'
import {graphql, PageProps, useStaticQuery} from 'gatsby'

import {CMSManagement, useCMSManagement} from '../../connectors/cms-management'
import {Dashboard} from '../../components/cms/Dashboard'
import {JaenPageLayout} from '../../components/JaenPageLayout/JaenPageLayout'
import {useEffect} from 'react'

const DashboardPage: React.FC<PageProps> = () => {
  const authentication = useAuthenticationContext()

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

  const user =
    authentication.user?.details?.firstName || authentication.user?.username

  return (
    <Dashboard
      user={user}
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
    name: '@atsnek/jaen'
  }
}

export {Head} from '@atsnek/jaen'
