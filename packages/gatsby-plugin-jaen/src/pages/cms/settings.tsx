import {PageProps} from 'gatsby'
import {PageConfig, useNotificationsContext} from 'jaen'

import {FormDataType, Settings} from '../../components/cms/Settings/Settings'
import {CMSManagement, useCMSManagement} from '../../connectors/cms-management'

const SettingsPage: React.FC<PageProps> = () => {
  const manager = useCMSManagement()
  const {toast} = useNotificationsContext()

  return (
    <Settings
      data={{siteMetadata: manager.siteMetadata}}
      onUpdate={({siteMetadata}: FormDataType) => {
        manager.updateSiteMetadata(siteMetadata || {})

        toast({
          title: 'Settings updated',
          status: 'success'
        })
      }}
    />
  )
}

const Page: React.FC<PageProps> = props => {
  return (
    <CMSManagement>
      <SettingsPage {...props} />
    </CMSManagement>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Jaen CMS | Settings',
  icon: 'FaCog',
  menu: {
    label: 'Settings',
    type: 'app',
    group: 'cms',
    order: 400
  },

  breadcrumbs: [
    {
      label: 'CMS',
      path: '/cms/'
    },
    {
      label: 'Settings',
      path: '/cms/settings/'
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

export {Head} from 'jaen'
