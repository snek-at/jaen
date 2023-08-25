import {Box, Button, Container, Heading, HStack, Stack} from '@chakra-ui/react'
import {FaArrowLeft} from 'react-icons/fa'

import Logo from '../Logo'
import {JaenFullLogo} from '../shared/JaenLogo/JaenLogo'
import {Link} from '../shared/Link/Link'

export interface JaenLogoutProps {
  goBackPath: string
  onGoBack?: () => void
  onSignOut: () => void
}

export const JaenLogout: React.FC<JaenLogoutProps> = props => {
  return (
    <Box id="coco" minH="100dvh" w="full">
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
          </Stack>

          <Box
            py={{base: '0', sm: '8'}}
            px={{base: '4', sm: '10'}}
            bg="bg.surface"
            boxShadow={{base: 'none', sm: 'md'}}
            borderRadius={{base: 'none', sm: 'xl'}}>
            <Stack spacing="12">
              <HStack justify="center" py="4">
                <Box maxW="64">
                  <Logo />
                </Box>
              </HStack>
              <Heading size="sm" fontWeight="thin" textAlign="center">
                Are you sure you want to sign out?
              </Heading>

              <Stack spacing="6">
                <Button variant="outline" size="lg" onClick={props.onSignOut}>
                  Sign out
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
          <JaenFullLogo height="12" width="auto" />
        </Stack>
      </Container>
    </Box>
  )
}
