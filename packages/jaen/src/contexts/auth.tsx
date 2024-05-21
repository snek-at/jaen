import {Alert, AlertIcon, Box, Center, Spinner, Text} from '@chakra-ui/react'
import React, {useEffect, useMemo} from 'react'
import {AuthProvider} from 'react-oidc-context'
import {PageProps} from '../types'

import {useAuth as useOIDCAuth} from 'react-oidc-context'

export const useAuth = () => {
  const oidcAuth = useOIDCAuth()

  const [isRolesLoading, setIsRolesLoading] = React.useState<boolean>(false)
  const [roles, setRoles] = React.useState<string[]>([])

  useEffect(() => {
    const getUsergrants = async () => {
      setIsRolesLoading(true)
      // https://accounts.cronit.io/auth/v1/usergrants/me/_search

      const response = await fetch(
        `${__JAEN_ZITADEL__.authority}/auth/v1/usergrants/me/_search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oidcAuth.user?.access_token}`
          }
        }
      )

      const data = await response.json()

      const userRoles = (data.result?.map((grant: any) => {
        return (grant.roles || []).map((role: any) => {
          return `${grant.projectId}:${role}`
        })
      }) || []) as string[][]

      const projectScopedRoles = userRoles.flat()

      const roles = (oidcAuth.user?.profile[
        'urn:zitadel:iam:org:project:roles'
      ] || []) as {
        [roleKey: string]: {
          [id: string]: string
        }
      }[]

      const rolesSet = new Set<string>([
        ...projectScopedRoles,
        ...roles.flatMap(item => Object.keys(item))
      ])

      setRoles(Array.from(rolesSet))

      setIsRolesLoading(false)
    }

    if (oidcAuth.user) {
      getUsergrants()
    }
  }, [oidcAuth.user])

  const auth = useMemo(() => {
    return {
      ...oidcAuth,
      user: {
        ...oidcAuth.user,
        roles
      },
      isLoading: isRolesLoading || oidcAuth.isLoading
    }
  }, [oidcAuth, roles, isRolesLoading])

  return auth
}

export const checkUserRoles = (
  user: ReturnType<typeof useAuth>['user'],
  roles: string[]
) => {
  if (!user) return false

  return roles.some(role => user.roles.includes(role))
}

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

export const withAuthSecurity = <
  P extends Omit<PageProps, 'children'> & {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  }
>(
  Component: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = props => {
    const pageConfigAuth = props.pageContext.pageConfig?.auth
    const auth = useAuth()

    console.log('auth', auth)

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

    if (pageConfigAuth?.isRequired) {
      let roles = pageConfigAuth?.roles

      if (pageConfigAuth.isAdminRequired) {
        if (!roles) {
          roles = ['jaen:admin']
        } else {
          roles.push('jaen:admin')
        }
      }

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

  return Wrapper
}
