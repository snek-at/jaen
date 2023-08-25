import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Text
} from '@chakra-ui/react'

interface FormData {
  emailAddress: string
}

export interface StepEmailProps {
  onSubmit: (data: FormData) => Promise<void>
}

const StepEmail: React.FC<StepEmailProps> = props => {
  const {
    handleSubmit,
    register,
    formState: {isSubmitting, errors}
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await props.onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="5">
        <FormControl
          id="emailAddress"
          isRequired
          isInvalid={!!errors.emailAddress}>
          <FormLabel>
            Enter your user account's verified email address and we will send
            initiate the password reset process.
          </FormLabel>
          <Input
            {...register('emailAddress', {
              required: true
            })}
            type="email"
            placeholder="Enter your email address"
          />
          <FormErrorMessage>
            {errors.emailAddress && errors.emailAddress.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}>
          Continue
        </Button>
      </Stack>
    </form>
  )
}

export default StepEmail
