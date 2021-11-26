import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  useToast,
  useMediaQuery,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import * as React from 'react'

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://avatars.githubusercontent.com/u/52858351?v=4'
  },
  {
    name: 'Segun Adebayo',
    url: 'https://avatars.githubusercontent.com/u/26285351?v=4'
  },
  {
    name: 'Kent Dodds',
    url: 'https://avatars.githubusercontent.com/u/52858351?v=4'
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://avatars.githubusercontent.com/u/52858351?v=4'
  },
  {
    name: 'Christian Nwamba',
    url: 'https://avatars.githubusercontent.com/u/52858351?v=4'
  }
]

export type LoginMainProps = {
  /**
   * Fired when the user clicks the login button
   *
   * @returns {Promise<boolean>} - true if the login was successful, false otherwise
   */
  onLogin: (username: string, password: string) => Promise<boolean> | undefined
  /**
   * Fired when the user clicks the "guest login" button
   *
   * @returns {Promise<boolean>} - true if the login was successful, false otherwise
   */
  onGuestLogin: () => Promise<boolean> | undefined
}

const LoginMain: React.FC<LoginMainProps> = props => {
  const [toastMessage, setToastMessage] = React.useState<{
    title: string
    body: string
    status: 'success' | 'error'
  } | null>(null)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const loginButtonRef = React.useRef()

  const toast = useToast()
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)')

  React.useEffect(() => {
    if (toastMessage) {
      const {title, body, status} = toastMessage

      toast({
        title,
        description: body,
        status,
        duration: 9000,
        isClosable: true
      })
    }
  }, [toastMessage, toast])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const success = await props.onLogin(username, password)

    if (success) {
      setToastMessage({
        title: 'Login successful',
        body: 'You have successfully logged into Jaen',
        status: 'success'
      })
    } else {
      setToastMessage({
        title: 'Login failed',
        body: 'You have entered an invalid username or password',
        status: 'error'
      })
    }
  }
  const handleGuestLogin = async () => {
    const success = await props.onGuestLogin()

    if (success) {
      setToastMessage({
        title: 'Login successful',
        body: 'You are now authenticated as snekman',
        status: 'success'
      })
    }
  }

  const guestLoginPopover = (
    <Popover>
      <PopoverTrigger>
        <Link color="green.500">guest login</Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Guest Login</PopoverHeader>
        <PopoverBody>
          <Text>
            You can use the guest login to preview all features used to power
            this site.
          </Text>
          <br />
          <Link color="green.500" onClick={handleGuestLogin}>
            Continue as snekman!
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )

  return (
    <Box position={'relative'}>
      {!isLargerThan992 && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Unsupported device!</AlertTitle>
          <AlertDescription>
            Your Jaen experience may be degraded, please use a desktop or laptop
            computer {<code>(above 992px)</code>}.
          </AlertDescription>
        </Alert>
      )}
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{base: 1, md: 2}}
        spacing={{base: 10, lg: 32}}
        py={{base: 10, sm: 20, lg: 32}}>
        <Stack spacing={{base: 10, md: 20}}>
          <Heading
            lineHeight={1.1}
            fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
            {/* Blazing fast
            <Text
              as={'span'}
              bgGradient="linear(to-r, green.500,green.400)"
              bgClip="text">
              {' & '}
            </Text>
            secure */}
            Blazing Fast, Simple & Secure
            <Text
              as={'span'}
              bgGradient="linear(to-r, green.500,green.400)"
              bgClip="text">
              {' CMS'}
            </Text>
          </Heading>
          {/* <Heading as="h6" size="xs">
            powered by Snek.
          </Heading> */}

          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map(avatar => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({base: 'md', md: 'lg'})}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, green.500,green.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{base: '4xl', md: '6xl'}}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{base: 'sm', md: 'lg'}}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({base: '44px', md: '60px'})}
              height={useBreakpointValue({base: '44px', md: '60px'})}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{base: 4, sm: 6, md: 8}}
          spacing={{base: 8}}
          maxW={{lg: 'lg'}}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
              Login to Jaen
              <Text
                as={'span'}
                bgGradient="linear(to-r, green.500,green.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}} as="div">
              Manage this site by entering your login credentials or using our{' '}
              {guestLoginPopover}.
            </Text>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={handleLogin}>
            <Stack spacing={4}>
              <Input
                placeholder="snekman"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500'
                }}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                placeholder="Enter password"
                type={'password'}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500'
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, green.500,green.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, green.500,green.400)',
                boxShadow: 'xl'
              }}
              type="submit">
              Login
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  )
}

export default LoginMain
