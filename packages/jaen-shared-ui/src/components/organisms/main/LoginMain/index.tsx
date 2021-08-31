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
  PopoverCloseButton
} from '@chakra-ui/react'

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

export default function JoinOurTeam() {
  const guestLoginPopover = (
    <Popover>
      <PopoverTrigger>
        <Link color="green.500">guest login</Link>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Guest Login</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  )

  return (
    <Box position={'relative'}>
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
            <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
              Manage this site by entering your login details or using our{' '}
              {guestLoginPopover}.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="snekman"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500'
                }}
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
              }}>
              Login
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  )
}
