import {PageConfig, useAuth} from '@atsnek/jaen'
import {PageProps} from 'gatsby'
import React from 'react'

import {JaenLogout} from '../components/JaenLogout/JaenLogout'
import {useCMSManagement, withCMSManagement} from '../connectors/cms-management'

const LogoutPage: React.FC<PageProps> = withCMSManagement(() => {
  const auth = useAuth()
  const {setIsEditing} = useCMSManagement()

  return (
    <JaenLogout
      onSignOut={async () => {
        setIsEditing(false)

        await auth.signoutRedirect({
          post_logout_redirect_uri: 'http://localhost:8000'
        })
      }}
      goBackPath="/"
    />
  )
})

export default LogoutPage

export const pageConfig: PageConfig = {
  label: 'Logout',
  icon: 'FaSignOutAlt',
  withoutJaenFrame: true,
  menu: {
    order: 1000,
    type: 'user',
    group: 'logout'
  },
  auth: {
    isRequired: true
  },
  layout: {
    name: 'jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
