import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Button,
  ButtonGroup,
  HStack,
  FormErrorMessage
} from '@chakra-ui/react'
import {useForm, Controller} from 'react-hook-form'

import {FieldGroup} from '../../../../components/shared/FieldGroup'
import {Link} from '../../../../components/shared/Link'

export interface PasswordFormData {
  password: string
  confirmPassword: string
}

export interface PasswordFormProps {
  onSubmit: (data: PasswordFormData) => Promise<void>
  passwordResetPath: string
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onSubmit,
  passwordResetPath
}) => {
  const {
    handleSubmit,
    control,
    formState: {isSubmitting, errors},
    watch
  } = useForm<PasswordFormData>()

  const onFormSubmit = handleSubmit(async data => {
    await onSubmit(data)
  })

  const password = watch('password', '')

  return (
    <form onSubmit={onFormSubmit}>
      <FieldGroup title="Password">
        <Stack width="full" spacing="6" maxW="2xl">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            display="none"
          />

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Controller
              control={control}
              name="password"
              rules={{required: 'This field is required'}}
              render={({field}) => (
                <Input
                  maxW="xs"
                  {...field}
                  type="password"
                  autoComplete="new-password"
                />
              )}
            />
          </FormControl>

          <FormControl
            id="confirmPassword"
            isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'This field is required',
                validate: value =>
                  value === password || 'Passwords do not match'
              }}
              render={({field}) => (
                <Input
                  maxW="xs"
                  {...field}
                  type="password"
                  autoComplete="new-password"
                />
              )}
            />

            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          {
            // update password or forgot password link
          }
          <Stack>
            <Text fontSize="sm" color="muted">
              Make sure your password is at least 15 characters OR at least 8
              characters including a number and a lowercase letter.
            </Text>

            <HStack spacing="4">
              <Button isLoading={isSubmitting} type="submit" variant="outline">
                Update password
              </Button>
              <Link fontSize="sm" to={passwordResetPath}>
                I forgot my password
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </FieldGroup>
    </form>
  )
}
