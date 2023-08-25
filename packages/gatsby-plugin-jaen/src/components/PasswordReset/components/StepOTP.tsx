import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Center,
  HStack,
  PinInput,
  PinInputField,
  VStack,
  Stack
} from '@chakra-ui/react'

interface FormData {
  otp: string
}

export interface StepEmailProps {
  onSubmit: (data: FormData) => Promise<void>
}

const StepOTP: React.FC<StepEmailProps> = props => {
  const {
    handleSubmit,
    control,
    watch,
    formState: {isSubmitting, errors}
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await props.onSubmit(data)
  }

  const otp = watch('otp', '')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="5">
        <FormControl id="otp" isRequired isInvalid={!!errors.otp}>
          {/* <FormLabel></FormLabel> */}
          <VStack>
            <FormLabel>Enter the 6-digit code sent to your email.</FormLabel>

            <Center>
              <HStack>
                <Controller
                  control={control}
                  rules={{required: 'This field is required'}}
                  name="otp"
                  render={({field}) => {
                    return (
                      <PinInput
                        otp
                        size="lg"
                        onChange={value => {
                          field.onChange(value)
                        }}
                        value={field.value}>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    )
                  }}
                />
              </HStack>
            </Center>
          </VStack>

          <FormErrorMessage>
            {errors.otp && errors.otp.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={otp.length !== 6}>
          Reset password
        </Button>
      </Stack>
    </form>
  )
}

export default StepOTP
