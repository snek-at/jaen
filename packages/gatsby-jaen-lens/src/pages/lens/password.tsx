import {
  Box,
  Heading,
  Progress,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import {
  PageConfig,
  PageProps,
  useAuthenticationContext,
  useNotificationsContext
} from '@atsnek/jaen'
import {navigate} from 'gatsby'
import {getTokenPair, sq as origin} from '@snek-functions/origin'

import {PasswordUpdateForm} from '../../components/PasswordUpdateForm'
import {sq} from '../../clients/lens/src'

const Page: React.FC<PageProps> = () => {
  const {user, updatePassword} = useAuthenticationContext()
  const {toast} = useNotificationsContext()

  const refreshToken = async () => {
    // Query the user id to refresh the token
    const [_, errors] = await origin.query(q => q.userMe.id)

    if (errors) {
      toast({
        title: 'Error',
        description:
          'Failed to refresh token. This is likely a bug or a network issue. Please try again later.',
        status: 'error'
      })
      return
    }
  }

  const handlePasswordChange = async (data: {
    newPassword: string
    changeResourcePassword: boolean
  }) => {
    const {accessToken} = getTokenPair()

    // Refresh the token to make sure it is valid.
    await refreshToken()

    const [_, errors] = await sq.mutate(
      m => m.updateInternalPassword({password: data.newPassword}),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const success = !errors || errors.length === 0

    if (success) {
      alert(accessToken)
      toast({
        title: 'Success',
        description: 'Password updated successfully',
        status: 'success'
      })

      navigate('/lens/')

      if (data.changeResourcePassword) {
        await updatePassword(data.newPassword)
      }
    } else {
      toast({
        title: 'Error',
        description:
          'Failed to update password. This is likely a bug or a network issue. Please try again later.',
        status: 'error'
      })
    }

    return success
  }

  if (!user) {
    return <Progress size="xs" isIndeterminate />
  }

  return (
    <Stack
      divider={<StackDivider borderColor="border.emphasized" />}
      id="coco"
      spacing="4">
      <Stack>
        <Heading as="h2" size="sm">
          Set internal password
        </Heading>

        <Text fontSize="sm" color="fg.muted">
          This sets the passwords for the internal services accessed through
          Lens. After updating the password, you can access the internal
          services using your username <strong>&lt;{user?.username}&gt;</strong>{' '}
          and the password you have set.
        </Text>
      </Stack>

      <PasswordUpdateForm
        resource={user?.resource}
        onSubmit={handlePasswordChange}
      />

      <Text as="em" size="xs">
        Note: This password is only valid for services connected to Lens
        authentication. If you have any questions or issues, please reach out to
        your administrator.
      </Text>
    </Stack>
  )
}

export const pageConfig: PageConfig = {
  label: 'Lens Password',
  icon: 'FaKey',
  layout: {
    name: 'jaen',
    type: 'form'
  },
  menu: {
    type: 'user',
    order: 500
  },
  auth: {
    isRequired: true
  },
  breadcrumbs: [
    {
      label: 'Lens',
      path: '/lens/'
    },
    {
      label: 'Password',
      path: '/lens/password/'
    }
  ],
  withoutJaenFrameStickyHeader: true
}

export default Page

export {Head} from '@atsnek/jaen'
