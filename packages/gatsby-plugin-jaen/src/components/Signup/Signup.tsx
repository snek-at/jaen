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

export interface SignupProps {
  onSignUp: (values: FormData) => Promise<void>
  goBackPath?: string
  onGoBack?: () => void
  signInPath?: string
  onSignIn?: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const Signup: React.FC<SignupProps> = props => {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
  } = useForm<FormData>()

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

    try {
      await props.onSignUp(data)
    } catch (e) {
      setAlert({
        status: 'error',
        message: `Unable to sign up.`,
        description: e.message
      })
    }
  }

  const content = (
    <Box id="coco" minH="100dvh">
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
                Create your account
              </Heading>
              <Text color="fg.muted">
                Already a user?{' '}
                <Link to={props.signInPath} onClick={props.onSignIn}>
                  Login
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

          <form onSubmit={handleSubmit(onSubmit) as any}>
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
                  <Stack
                    spacing="4"
                    direction={{
                      base: 'column',
                      md: 'row'
                    }}>
                    <FormControl
                      id="login_form_first_name"
                      isRequired
                      isInvalid={!!errors.firstName}>
                      <FormLabel htmlFor="firstName">First name</FormLabel>
                      <Input
                        id="firstName"
                        {...register('firstName', {
                          required: true
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstName && 'First name is required'}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="login_form_last_name"
                      isRequired
                      isInvalid={!!errors.lastName}>
                      <FormLabel htmlFor="lastName">Last name</FormLabel>
                      <Input
                        id="lastName"
                        {...register('lastName', {
                          required: true
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastName && 'Last name is required'}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>

                  <FormControl
                    id="login_form_email"
                    isRequired
                    isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      {...register('email', {
                        required: true
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && 'Email is required'}
                    </FormErrorMessage>
                  </FormControl>

                  <PasswordField
                    {...register('password', {required: true})}
                    isRequired
                    isInvalid={!!errors.password?.message}
                  />
                </Stack>

                <Stack spacing="6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}>
                    Sign up
                  </Button>
                  {/* <HStack>
            <Divider />
            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
              powered by
            </Text>
            <Divider />
            <OAuthButtonGroup />
          </HStack> */}
                </Stack>
              </Stack>
            </Box>
          </form>

          <JaenFullLogo height="12" width="auto" />
        </Stack>
      </Container>
    </Box>
  )

  return content
}

export default Signup
