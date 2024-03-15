import React, {useMemo} from 'react'
import {AuthContextProps, AuthProvider, useAuth} from 'react-oidc-context'
import {PageConfig} from '../types'
import {Alert, AlertIcon, Box, Center, Spinner, Text} from '@chakra-ui/react'

export {useAuth} from 'react-oidc-context'

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  const scope = useMemo(() => {
    const projectIds: string[] = __JAEN_ZITADEL__.projectIds || []

    // Add "zitadel" to projectIds
    projectIds.push('zitadel')

    const parts = new Set<string>()

    parts.add('openid')
    parts.add('profile')
    parts.add('email')
    parts.add(`urn:zitadel:iam:org:id:${__JAEN_ZITADEL__.organizationId}`)
    projectIds.forEach(projectId => {
      parts.add(`urn:zitadel:iam:org:project:id:${projectId}:aud`)
    })
    parts.add('offline_access')

    return Array.from(parts).join(' ')
  }, [])

  return (
    <AuthProvider
      client_id={__JAEN_ZITADEL__.clientId}
      redirect_uri={__JAEN_ZITADEL__.redirectUri}
      scope={scope}
      loadUserInfo
      authority={__JAEN_ZITADEL__.authority}
      onSigninCallback={() => {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
      }}>
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

  const userRoles = (user.profile['urn:zitadel:iam:org:project:roles'] ||
    []) as {
    [roleKey: string]: {
      [id: string]: string
    }
  }[]

  // Check if role is in userRoles (roleKey)
  for (const role of roles) {
    if (userRoles.find(userRole => userRole[role])) {
      return true
    }
  }

  return false
}

export const withAuthSecurity = <P extends object>(
  Component: React.ComponentType<P>,
  pageConfig?: PageConfig
) => {
  return (props: P) => {
    const auth = useAuth()

    const loadingText = useMemo(() => {
      switch (auth.activeNavigator) {
        case 'signinRedirect':
        case 'signinSilent':
          return 'Signing you in...'
        case 'signoutSilent':
        case 'signoutRedirect':
          return 'Signing you out...'
        case undefined:
          return undefined
        default:
          return 'Loading...'
      }
    }, [auth.activeNavigator])

    const isAuthRequired = pageConfig?.auth?.isRequired

    if (loadingText) {
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

    if (isAuthRequired) {
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
