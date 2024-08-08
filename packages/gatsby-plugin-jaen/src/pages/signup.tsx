import {PageConfig, useAuth} from '@atsnek/jaen'
import {navigate, PageProps} from 'gatsby'
import React from 'react'

const SignupPage: React.FC<PageProps> = () => {
  const auth = useAuth()

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      void navigate('/')
    } else {
      auth.signinRedirect()
    }
  }, [auth.isAuthenticated])

  return null
}

export default SignupPage

export const pageConfig: PageConfig = {
  label: 'Signup',
  withoutJaenFrame: true,
  layout: {
    name: 'jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
