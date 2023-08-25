import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import React, {useState} from 'react'

import {FaArrowLeft} from 'react-icons/fa'
import {JaenFullLogo} from '../../components/shared/JaenLogo/JaenLogo'
import {Link} from '../../components/shared/Link'
import StepEmail from './components/StepEmail'
import StepOTP from './components/StepOTP'
import StepPassword from './components/StepPassword'

// Define form steps
enum FormStep {
  EMAIL,
  PASSWORD,
  OTP
}

interface PasswordResetProps {
  goBackPath?: string
  onGoBack?: () => void
  signUpPath?: string
  onSignUp?: () => void

  onSendEmail: (email: string) => Promise<void>
  onResetPassword: (
    email: string,
    otp: string,
    password: string
  ) => Promise<void>
}

interface FormData {
  emailAddress: string
  password: string
}

export const PasswordReset: React.FC<PasswordResetProps> = props => {
  const [formStep, setFormStep] = useState(FormStep.EMAIL)
  const [formData, setFormData] = useState<FormData>({
    emailAddress: '',
    password: ''
  })

  const [alert, setAlert] = useState<{
    status: 'error' | 'success' | 'info'
    message: string | JSX.Element
    description?: string
  } | null>(null)

  const resetAlert = () => {
    setAlert(null)
  }

  return (
    <Box id="coco" minH="100dvh">
      <Container maxW="lg" py={{base: '6', md: '12'}} px={{base: '0', sm: '8'}}>
        <Stack spacing="8">
          <Stack spacing="6">
            <HStack justify="center">
              {(formStep === FormStep.PASSWORD ||
                formStep === FormStep.OTP) && (
                <Button
                  variant="outline"
                  leftIcon={<FaArrowLeft />}
                  onClick={() => setFormStep(FormStep.EMAIL)}>
                  Try another email
                </Button>
              )}

              {formStep === FormStep.EMAIL && (
                <Link
                  as={Button}
                  variant="outline"
                  leftIcon={<FaArrowLeft />}
                  to={props.goBackPath}
                  onClick={props.onGoBack}>
                  Back to website
                </Link>
              )}
            </HStack>

            <Stack spacing={{base: '2', md: '3'}} textAlign="center">
              <>
                <Heading size={{base: 'xs', md: 'sm'}}>
                  {formStep === FormStep.EMAIL && 'Reset your password'}
                  {formStep === FormStep.PASSWORD && 'Enter your new password'}
                  {formStep === FormStep.OTP && 'Enter your code'}
                </Heading>
                <Text color="fg.muted">
                  {formStep === FormStep.EMAIL && (
                    <>
                      Don&apos;t have an account?{' '}
                      <Link to={props.signUpPath}>Sign up</Link>
                    </>
                  )}
                  {formStep === FormStep.PASSWORD && (
                    <>
                      Enter a new password for <b>{formData.emailAddress}</b>.
                    </>
                  )}

                  {formStep === FormStep.OTP && (
                    <>
                      A one-time password (OTP) has been sent to{' '}
                      <strong>{formData.emailAddress}</strong>.
                    </>
                  )}
                </Text>
              </>
            </Stack>
          </Stack>

          {alert && (
            <Alert status={alert.status}>
              <AlertIcon />
              <Box w="full">
                <AlertTitle>{alert.message}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={resetAlert}
              />
            </Alert>
          )}

          <Box
            py={{base: '0', sm: '8'}}
            px={{base: '4', sm: '10'}}
            bg="bg.surface"
            boxShadow={{base: 'none', sm: 'md'}}
            borderRadius={{base: 'none', sm: 'xl'}}>
            {formStep === FormStep.EMAIL && (
              <StepEmail
                onSubmit={async data => {
                  await new Promise(resolve => setTimeout(resolve, 500))

                  setFormData({
                    ...formData,
                    emailAddress: data.emailAddress
                  })

                  setFormStep(FormStep.PASSWORD)
                }}
              />
            )}

            {formStep === FormStep.PASSWORD && (
              <StepPassword
                onSubmit={async data => {
                  await new Promise(resolve => setTimeout(resolve, 500))

                  setFormData({
                    ...formData,
                    password: data.password
                  })

                  setFormStep(FormStep.OTP)

                  await props.onSendEmail(formData.emailAddress)
                }}
              />
            )}

            {formStep === FormStep.OTP && (
              <StepOTP
                onSubmit={async data => {
                  try {
                    await props.onResetPassword(
                      formData.emailAddress,
                      data.otp,
                      formData.password
                    )
                  } catch (err) {
                    setAlert({
                      status: 'error',
                      message: 'Failed to reset password',
                      description: err.message
                    })
                    return
                  }
                }}
              />
            )}
          </Box>

          <JaenFullLogo height="12" width="auto" />
        </Stack>
      </Container>
    </Box>
  )
}

export default PasswordReset
