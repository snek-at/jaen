import {
  PageConfig,
  snekResourceId,
  useAuthenticationContext
} from '@atsnek/jaen'
import {navigate, PageProps} from 'gatsby'
import React from 'react'
import {sq} from '@snek-functions/origin'

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
        const [_, errors] = await sq.mutate(
          m =>
            m.userCreate({
              resourceId: snekResourceId,
              values: {
                details: {
                  firstName: data.firstName,
                  lastName: data.lastName
                },
                username: data.username,
                emailAddress: data.email,
                password: data.password
              }
            }).id
        )

        if (errors?.length > 0) {
          throw errors[0]
        }
      }}
    />
  )
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
