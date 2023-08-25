import {
  PageConfig,
  useAuthenticationContext,
  useNotificationsContext
} from '@atsnek/jaen'
import {sq} from '@snek-functions/origin'
import {navigate, PageProps} from 'gatsby'
import React from 'react'

import {PasswordReset} from '../components/PasswordReset/PasswordReset'

const PasswordResetPage: React.FC<PageProps> = () => {
  const {isAuthenticated, isLoading} = useAuthenticationContext()
  const {toast} = useNotificationsContext()

  React.useEffect(() => {
    if (isAuthenticated) {
      void navigate('/')
    }
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return null
  }

  const handleSendMail = async (emailAddress: string): Promise<void> => {
    try {
      const [_, errors] = await sq.mutate(m =>
        m.passwordReset({emailAddress, resourceId: __SNEK_RESOURCE_ID__})
      )
      if (errors) {
        throw new Error(errors[0]?.message)
      }

      toast({
        title: 'Password reset email sent',
        status: 'success'
      })
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error'
      })
    }
  }

  const handleResetPassword = async (
    emailAddress: string,
    otp: string,
    password: string
  ): Promise<void> => {
    try {
      const [_, errors] = await sq.mutate(m =>
        m.passwordResetConfirm({
          emailAddress,
          otp,
          password,
          resourceId: __SNEK_RESOURCE_ID__
        })
      )
      if (errors) {
        throw new Error(errors[0]?.message)
      }

      toast({
        title: 'Password reset',
        status: 'success'
      })

      void navigate('/login/')
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error'
      })
    }
  }

  return (
    <PasswordReset
      goBackPath="/"
      signUpPath="/signup/"
      onSendEmail={handleSendMail}
      onResetPassword={handleResetPassword}
    />
  )
}

export default PasswordResetPage

export const pageConfig: PageConfig = {
  label: 'Forgot your password?',
  withoutJaenFrame: true,
  layout: {
    name: '@atsnek/jaen',
    type: 'form'
  }
}

export {Head} from '@atsnek/jaen'
