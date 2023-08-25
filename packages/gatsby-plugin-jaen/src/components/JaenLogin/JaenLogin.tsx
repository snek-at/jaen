/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalContent,
  Stack,
  Text
} from '@chakra-ui/react'
import {useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {FaArrowLeft} from 'react-icons/fa'

import Logo from '../Logo'
import {JaenFullLogo} from '../shared/JaenLogo/JaenLogo'
import {Link} from '../shared/Link/Link'
import {PasswordField} from './components/PasswordField'

export interface JaenLoginProps {
  onSignIn: (values: FormData) => Promise<void>
  goBackPath?: string
  onGoBack?: () => void
  forgotPasswordPath?: string
  onForgotPassword?: () => void
  signUpPath?: string
  onSignUp?: () => void
  isModal?: boolean
}

interface FormData {
  login: string
  password: string
  logMeOut: boolean
}

export const JaenLogin: React.FC<JaenLoginProps> = props => {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
  } = useForm<FormData>()

  console.log(errors)

  const [alert, setAlert] = useState<{
    status: 'error' | 'success' | 'info'
    message: string | JSX.Element
    description?: string
  } | null>(null)

  const resetAlert = () => {
    setAlert(null)
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData, e) => {
    e?.preventDefault()

    console.log(data)

    try {
      await props.onSignIn(data)
    } catch (e) {
      setAlert({
        status: 'error',
        message: 'Unable to sign in',
        description: e.message
      })
    }
  }

  const content = (
    <Box
      id="coco"
      minH="100dvh"
      bg={props.isModal ? 'bg.translucent' : undefined}>
      <Container maxW="lg" py={{base: '6', md: '12'}} px={{base: '0', sm: '8'}}>
        <Stack spacing="8">
          <Stack spacing="6">
            <HStack justify="center">
              <Link
                as={Button}
                variant="outline"
                leftIcon={<FaArrowLeft />}
                to={props.goBackPath}
                onClick={props.onGoBack}>
                Back to website
              </Link>
            </HStack>

            <Stack spacing={{base: '2', md: '3'}} textAlign="center">
              <Heading size={{base: 'xs', md: 'sm'}}>
                Log in to your account
              </Heading>
              <Text color="fg.muted">
                Don&apos;t have an account?{' '}
                <Link to={props.signUpPath} onClick={props.onSignUp}>
                  Sign up
                </Link>
              </Text>
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

          <form onSubmit={handleSubmit(onSubmit) as any} autoComplete="off">
            <Box
              py={{base: '0', sm: '8'}}
              px={{base: '4', sm: '10'}}
              bg="bg.surface"
              boxShadow={{base: 'none', sm: 'md'}}
              borderRadius={{base: 'none', sm: 'xl'}}>
              <Stack spacing="6">
                <HStack justify="center" py="4">
                  <Box maxW="64">
                    <Logo />
                  </Box>
                </HStack>
                <Stack spacing="5">
                  <FormControl
                    id="login_form_login"
                    isRequired
                    isInvalid={!!errors.login}>
                    <FormLabel htmlFor="login">
                      Username or email address
                    </FormLabel>
                    <Input
                      id="login"
                      {...register('login', {required: true})}
                    />
                    <FormErrorMessage>
                      {errors.login && 'Username or email address'}
                    </FormErrorMessage>
                  </FormControl>
                  <PasswordField
                    {...register('password', {required: true})}
                    isRequired
                    isInvalid={!!errors.password?.message}
                  />
                </Stack>
                <HStack justify="space-between">
                  <Checkbox id="logMeOutAfterwards" {...register('logMeOut')}>
                    Log me out after
                  </Checkbox>
                  <Link
                    size="sm"
                    to={props.forgotPasswordPath}
                    onClick={props.onForgotPassword}>
                    Forgot password?
                  </Link>
                </HStack>
                <Stack spacing="6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>

          <JaenFullLogo height="12" width="auto" />
        </Stack>
      </Container>
    </Box>
  )

  if (props.isModal) {
    return (
      <Modal
        size="full"
        isOpen={true}
        onClose={() => {
          props.onGoBack?.()
        }}>
        <ModalContent
          bg="transparent"
          backdropFilter="blur(8px) saturate(180%) contrast(46%) brightness(120%)">
          {content}
        </ModalContent>
      </Modal>
    )
  }

  return content
}

export default JaenLogin
