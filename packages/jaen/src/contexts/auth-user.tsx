import React, {createContext, useMemo} from 'react'
import {useAuth} from 'react-oidc-context'
import {useNotificationsContext} from './notifications'
import {Text} from '@chakra-ui/react'

export interface AuthUser {
  id: string
  state: string
  userName: string
  loginNames: string[]
  preferredLoginName: string
  human: {
    profile: {
      firstName: string
      lastName: string
      nickName: string
      displayName: string
      preferredLanguage: string
      gender: string
      avatarUrl: string
    }
    email: {
      email: string
      isEmailVerified: boolean
    }
    phone: {
      phone: string
      isPhoneVerified: boolean
    }
  }
}

export interface AuthPasswordPolicy {
  minLength: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSymbol: boolean
  isDefault: boolean
}

const AuthUserContext = createContext<{
  user: AuthUser
  passwordPolicy: AuthPasswordPolicy
  usernameUpdate: (userName: string) => Promise<void>
  profileUpdate: (profile: AuthUser['human']['profile']) => Promise<void>
  profileAvatarUpdate: (avatarFile: File) => Promise<void>

  emailUpdate: (email: string) => Promise<void>
  emailResendCode: () => Promise<void>
  phoneUpdate: (phone: string) => Promise<void>
  phoneVerify: (code: string) => Promise<void>
  phoneResendCode: () => Promise<void>
  phoneDelete: () => Promise<void>
  passwordUpdate: (oldPassword: string, newPassword: string) => Promise<void>
  refresh: () => Promise<void>
} | null>(null)

export const AuthUserProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  const auth = useAuth()

  const baseUrl = auth.settings.authority

  const notify = useNotificationsContext()

  const sendAPIRequest = async (
    path: string,
    method: string,
    body: any,
    headers: any = {},
    options: {
      stringifyBody?: boolean
    } = {stringifyBody: true}
  ) => {
    try {
      const reqHeaders = Object.fromEntries(
        Object.entries({
          Accept: 'application/json',
          Authorization: `Bearer ${auth.user?.access_token}`,
          ...headers
        }).filter(([_, value]) => value !== undefined)
      ) as any

      const reqBody = options.stringifyBody ? JSON.stringify(body) : body

      const response = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: reqHeaders,
        body: reqBody
      })

      if (response.headers.get('content-type') === 'application/json') {
        const data = await response.json()

        console.log(
          'Performed action: ',
          method,
          path,
          body,
          'Response: ',
          data
        )

        if (!response.ok) {
          notify.toast({
            position: 'top-right',
            title: 'Error',
            description: data.message,
            status: 'error'
          })
        } else {
          notify.toast({
            position: 'top-right',
            title: 'Success',
            description: 'Action completed successfully',
            status: 'success'
          })

          // Refresh the profile
          await refetchProfile()
        }
      } else {
        console.log(
          'Performed action: ',
          method,
          path,
          body,
          'Response: ',
          response
        )

        if (!response.ok) {
          notify.toast({
            position: 'top-right',
            title: 'Error',
            description: response.statusText,
            status: 'error'
          })
        } else {
          notify.toast({
            position: 'top-right',
            title: 'Success',
            description: 'Action completed successfully',
            status: 'success'
          })

          // Refresh the profile
          await refetchProfile()
        }
      }
    } catch (error) {
      console.error('Error:', error)
      notify.toast({
        position: 'top-right',
        title: 'Error',
        description: `Internal error: ${error.message}`,
        status: 'error'
      })
    }
  }

  const getData = async () => {
    // curl -L -X GET 'https://$CUSTOM-DOMAIN/auth/v1/users/me/profile' \
    // -H 'Accept: application/json' \
    // -H 'Authorization: Bearer <TOKEN>'

    const getUser = async () => {
      const response = await fetch(`${baseUrl}/auth/v1/users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${auth.user?.access_token}`
        }
      })

      const data = await response.json()

      const user = data.user

      return user
    }

    const getPasswordPolicy = async () => {
      // curl -L -X GET 'https://$CUSTOM-DOMAIN/auth/v1/policies/passwords/complexity' \
      // -H 'Accept: application/json' \
      // -H 'Authorization: Bearer <TOKEN>'

      const response = await fetch(
        `${baseUrl}/auth/v1/policies/passwords/complexity`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${auth.user?.access_token}`
          }
        }
      )

      const data = await response.json()

      const passwordPolicy = data.policy

      return passwordPolicy
    }

    const [user, passwordPolicy] = await Promise.all([
      getUser(),
      getPasswordPolicy()
    ])

    return {
      user,
      passwordPolicy
    }
  }

  const [data, setData] = React.useState<any>()

  const refetchProfile = async () => {
    const data = await getData()

    setData(data)
  }

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.isAuthenticated) return

      await refetchProfile()
    }

    fetchProfile()
  }, [auth.isAuthenticated])

  const usernameUpdate = async (userName: string) => {
    await sendAPIRequest('/auth/v1/users/me/username', 'PUT', {userName})
  }

  const profileUpdate = async (profile: AuthUser['human']['profile']) => {
    await sendAPIRequest('/auth/v1/users/me/profile', 'PUT', profile)
  }

  const profileAvatarUpdate = async (avatarFile: File) => {
    const formData = new FormData()
    formData.append('file', avatarFile)

    await sendAPIRequest(
      '/assets/v1/users/me/avatar',
      'POST',
      formData,
      {
        Accept: undefined
      },
      {
        stringifyBody: false
      }
    )
  }

  const emailUpdate = async (email: string) => {
    await sendAPIRequest('/auth/v1/users/me/email', 'PUT', {email})
  }

  const emailResendCode = async () => {
    await sendAPIRequest(
      '/auth/v1/users/me/email/_resend_verification',
      'POST',
      {}
    )
  }

  const phoneUpdate = async (phone: string) => {
    await sendAPIRequest('/auth/v1/users/me/phone', 'PUT', {phone})
  }

  const phoneVerify = async (code: string) => {
    await sendAPIRequest('/auth/v1/users/me/phone/_verify', 'POST', {code})
  }

  const phoneResendCode = async () => {
    await sendAPIRequest(
      '/auth/v1/users/me/phone/_resend_verification',
      'POST',
      {}
    )
  }

  const phoneDelete = async () => {
    await sendAPIRequest('/auth/v1/users/me/phone', 'DELETE', {})
  }

  const passwordUpdate = async (oldPassword: string, newPassword: string) => {
    await sendAPIRequest('/auth/v1/users/me/password', 'PUT', {
      oldPassword,
      newPassword
    })
  }

  const refresh = async () => {
    await refetchProfile()
  }

  const value = useMemo(() => {
    return {
      user: data?.user,
      passwordPolicy: data?.passwordPolicy,
      usernameUpdate,
      profileUpdate,
      profileAvatarUpdate,
      emailUpdate,
      emailResendCode,
      phoneUpdate,
      phoneVerify,
      phoneResendCode,
      phoneDelete,
      passwordUpdate,
      refresh
    }
  }, [data])

  if (!auth.isAuthenticated || !data) {
    return <Text>Loading...</Text>
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const useAuthUser = () => {
  const context = React.useContext(AuthUserContext)

  if (!context) {
    throw new Error('useAuthUser must be used within a AuthUserProvider')
  }

  return context
}
