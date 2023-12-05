import {PageConfig, useAuthenticationContext} from '@atsnek/jaen'
import {PageProps} from 'gatsby'
import React from 'react'

import {JaenLogout} from '../components/JaenLogout/JaenLogout'
import {useCMSManagement, withCMSManagement} from '../connectors/cms-management'

const LogoutPage: React.FC<PageProps> = withCMSManagement(() => {
  const {logout, isAuthenticated} = useAuthenticationContext()
  const {setIsEditing} = useCMSManagement()

  React.useEffect(() => {}, [isAuthenticated])

  return (
    <JaenLogout
      onSignOut={async () => {
        setIsEditing(false)

        await logout()
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
