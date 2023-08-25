import {PageConfig, useAuthenticationContext} from '@atsnek/jaen'
import {navigate, PageProps} from 'gatsby'
import React from 'react'

import {Signup} from '../components/Signup/Signup'

const SignupPage: React.FC<PageProps> = () => {
  const {isAuthenticated, isLoading} = useAuthenticationContext()

  React.useEffect(() => {
    if (isAuthenticated) {
      void navigate('/')
    }
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return null
  }
  return (
    <Signup
      signInPath="/login"
      goBackPath="/"
      onSignUp={async data => {
        alert(
          'Sorry, registration is currently disabled. Please try again later.'
        )
      }}
    />
  )
}

export default SignupPage

export const pageConfig: PageConfig = {
  label: 'Signup',
  withoutJaenFrame: true,
  layout: {
    name: '@atsnek/jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
