import {PageConfig, useAuthenticationContext} from '@atsnek/jaen'
import {navigate, PageProps} from 'gatsby'
import React from 'react'

import {JaenLogin} from '../components/JaenLogin/JaenLogin'

const LoginPage: React.FC<PageProps> = () => {
  const {login, isAuthenticated, isLoading} = useAuthenticationContext()

  React.useEffect(() => {
    if (isAuthenticated) {
      void navigate('/')
    }
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return null
  }

  return (
    <JaenLogin
      signUpPath="/signup"
      forgotPasswordPath="/password_reset"
      onSignIn={async data => {
        await login(data.login, data.password, data.logMeOut)
      }}
      goBackPath="/"
    />
  )
}

export default LoginPage

export const pageConfig: PageConfig = {
  label: 'Login',
  withoutJaenFrame: true,
  layout: {
    name: 'jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
