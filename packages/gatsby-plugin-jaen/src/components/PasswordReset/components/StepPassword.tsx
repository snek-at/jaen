import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  FormErrorMessage
} from '@chakra-ui/react'

interface FormData {
  password: string
  confirmPassword: string
}

export interface StepEmailProps {
  onSubmit: (data: FormData) => Promise<void>
}

const StepPassword: React.FC<StepEmailProps> = props => {
  const {
    handleSubmit,
    control,
    watch,
    formState: {isSubmitting, errors}
  } = useForm<FormData>()

  const password = watch('password', '')

  const onSubmit = async (data: FormData) => {
    await props.onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="5">
        <Input type="email" name="email" autoComplete="email" display="none" />

        <FormControl id="password" isRequired isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Controller
            control={control}
            name="password"
            rules={{required: 'This field is required'}}
            render={({field}) => (
              <Input {...field} type="password" autoComplete="new-password" />
            )}
          />
        </FormControl>

        <FormControl
          id="confirmPassword"
          isRequired
          isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'This field is required',
              validate: value => value === password || 'Passwords do not match'
            }}
            render={({field}) => (
              <Input {...field} type="password" autoComplete="new-password" />
            )}
          />

          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}>
          Send password reset mail
        </Button>
      </Stack>
    </form>
  )
}

export default StepPassword
