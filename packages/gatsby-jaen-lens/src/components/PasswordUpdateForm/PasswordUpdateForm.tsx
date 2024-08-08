import React, {useState} from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText, // Added FormHelperText
  FormLabel,
  Input,
  VStack,
  Progress,
  Text,
  Stack,
  Checkbox
} from '@chakra-ui/react'
import {useForm, Controller} from 'react-hook-form'
import zxcvbn from 'zxcvbn'

type PasswordResetFormValues = {
  newPassword: string
  confirmPassword: string
  changeResourcePassword: boolean
}

export interface PasswordUpdateFormProps {
  onSubmit: (data: PasswordResetFormValues) => Promise<boolean>
  resource: {name: string}
}

export const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = props => {
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null)
  const [passwordSuggestions, setPasswordSuggestions] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: {errors, isSubmitting}
  } = useForm<PasswordResetFormValues>({
    defaultValues: {
      changeResourcePassword: true
    }
  })

  const onSubmit = async (data: PasswordResetFormValues) => {
    await props.onSubmit(data)
  }

  const checkPasswordStrength = (password: string) => {
    const result = zxcvbn(password)
    setPasswordStrength(result.score)
    setPasswordSuggestions(result.feedback.suggestions)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === null) {
      return 'gray'
    }
    // Define color codes for different password strengths
    const colors = ['red', 'orange', 'yellow', 'green', 'teal']
    // Map the password strength score (0-4) to the colors
    return colors[passwordStrength]
  }

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="bg.surface"
      borderColor="border.emphasized">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={8} align="stretch">
          <Stack spacing="4">
            <FormControl isInvalid={!!errors.newPassword}>
              <FormLabel htmlFor="newPassword">New password</FormLabel>
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: 'New Password is required',
                  validate: value => {
                    // Custom validation for password strength
                    const strengthResult = zxcvbn(value)
                    if (strengthResult.score < 2) {
                      return 'Password strength is insufficient'
                    }
                    return true
                  }
                }}
                render={({field}) => (
                  <Stack>
                    <Input
                      {...field}
                      type="password"
                      onChange={e => {
                        field.onChange(e)
                        checkPasswordStrength(e.target.value)
                      }}
                    />
                    <Progress
                      value={
                        passwordStrength === null
                          ? 0
                          : (passwordStrength + 1) * 25
                      }
                      colorScheme={getPasswordStrengthColor()}
                      size="sm"
                      isAnimated
                    />
                  </Stack>
                )}
              />
              {/* <FormHelperText>
              Password Strength:{' '}
              {
                ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][
                  passwordStrength || 0
                ]
              }
            </FormHelperText> */}
              {passwordSuggestions.length > 0 && (
                <FormHelperText color="red">
                  Suggestions: {passwordSuggestions.join(' ')}
                </FormHelperText>
              )}
              <FormErrorMessage>
                {errors.newPassword && errors.newPassword.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === getValues('newPassword') ||
                    'Passwords do not match'
                }}
                render={({field}) => <Input {...field} type="password" />}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isInvalid={!!errors.changeResourcePassword}>
            <Stack direction="row" align="center">
              <Checkbox
                {...register('changeResourcePassword', {
                  required: false
                })}>
                Change {props.resource.name} password
              </Checkbox>
            </Stack>
            <FormHelperText>
              When checked, the password reset will change all internal
              passwords and the main password.
            </FormHelperText>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting}>
            Update Password
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
