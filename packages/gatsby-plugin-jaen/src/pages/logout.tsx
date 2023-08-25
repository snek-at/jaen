import {PageConfig, useAuthenticationContext} from '@atsnek/jaen'
import {PageProps} from 'gatsby'
import React from 'react'

import {JaenLogout} from '../components/JaenLogout/JaenLogout'

const LogoutPage: React.FC<PageProps> = () => {
  const {logout, isAuthenticated} = useAuthenticationContext()

  React.useEffect(() => {}, [isAuthenticated])

  return (
    <JaenLogout
      onSignOut={() => {
        void logout().then(() => {
          window.location.href = '/'
        })
      }}
      goBackPath="/"
    />
  )
}

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
    name: '@atsnek/jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
