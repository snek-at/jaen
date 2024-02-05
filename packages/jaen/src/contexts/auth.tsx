import React, {useMemo} from 'react'
import {AuthContextProps, AuthProvider, useAuth} from 'react-oidc-context'
import {PageConfig} from '../types'
import {Alert, AlertIcon, Box, Center, Spinner, Text} from '@chakra-ui/react'

export {useAuth} from 'react-oidc-context'

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return (
    <AuthProvider
      client_id={__ZITADEL_CLIENT_ID__}
      redirect_uri={__ZITADEL_REDIRECT_URI__}
      scope={`openid profile email urn:zitadel:iam:org:id:${__ZITADEL_ORGANIZATION_ID__} urn:zitadel:iam:org:projects:roles urn:zitadel:iam:org:project:id:zitadel:aud`}
      loadUserInfo
      authority={__ZITADEL_AUTHORITY__}>
      {children}
    </AuthProvider>
  )
}

export const checkUserRoles = (
  user: AuthContextProps['user'],
  roles: string[]
) => {
  if (!user) {
    return false
  }

  const userRoles = (user.profile['urn:zitadel:iam:org:projects:roles'] ||
    []) as string[]

  return roles.some(role => userRoles.includes(role))
}

export const withAuthSecurity = <P extends object>(
  Component: React.ComponentType<P>,
  pageConfig?: PageConfig
) => {
  return (props: P) => {
    const auth = useAuth()

    const loadingText = useMemo(() => {
      switch (auth.activeNavigator) {
        case 'signinSilent':
          return 'Signing you in...'
        case 'signoutRedirect':
          return 'Signing you out...'
        default:
          return 'Loading...'
      }
    }, [auth.activeNavigator])

    const isAuthRequired = pageConfig?.auth?.isRequired

    if (isAuthRequired) {
      if (auth.isLoading) {
        return (
          <Center height="100vh">
            <Box textAlign="center">
              <Spinner size="xl" color="blue.500" mb={4} />
              <Text>{loadingText}</Text>
              {auth.error && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  Error: {auth.error.message}
                </Alert>
              )}
            </Box>
          </Center>
        )
      }

      if (auth.error) {
        return (
          <Center height="100vh">
            <Box textAlign="center">
              <Alert status="error" mb={4}>
                <AlertIcon />
                Error: {auth.error.message}
              </Alert>
            </Box>
          </Center>
        )
      }

      const roles = pageConfig?.auth?.roles

      if (roles) {
        const hasRoles = checkUserRoles(auth.user, roles)

        if (!hasRoles) {
          return (
            <Center height="100vh">
              <Box textAlign="center">
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  You don't have the required roles to view this page
                </Alert>
              </Box>
            </Center>
          )
        }
      }

      if (auth.isAuthenticated) {
        return <Component {...props} />
      }

      return (
        <Center height="100vh">
          <Box textAlign="center">
            <Alert status="error" mb={4}>
              <AlertIcon />
              You need to be logged in to view this page
            </Alert>
          </Box>
        </Center>
      )
    }

    return <Component {...props} />
  }
}
