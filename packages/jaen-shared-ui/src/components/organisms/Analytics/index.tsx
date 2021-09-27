import {
  Input,
  Text,
  InputGroup,
  Heading,
  Box,
  Stack,
  Divider,
  Flex,
  Center,
  InputRightAddon,
  InputLeftAddon,
  Textarea,
  Checkbox,
  Button
} from '@chakra-ui/react'
import React, {useState} from 'react'
import {
  AuthorizeButton,
  SessionsByDateChart,
  SessionsBySourceChart,
  SignOutButton,
  ViewSelector
} from 'react-analytics-charts'
import {useAnalyticsApi} from 'react-use-analytics-api'

const Analytics: React.FC = () => {
  const {ready, gapi, authorized, error} = useAnalyticsApi()
  const [viewId, setViewId] = useState('')

  const authOptions = {
    clientId:
      '123456789012-abc123def456ghi789jkl012mno345p.apps.googleusercontent.com'
  }

  return (
    <>
      {/* <Divider mt={4} mb={4} /> */}
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" h="67vh" p={2}>
        <Flex h="65vh">
          <Box paddingRight={5} minW="sm">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={2}
              userSelect="none">
              <Flex>
                <Box>~ Site</Box>
              </Flex>
            </Box>
          </Box>
          <Center height="65vh">
            <Divider orientation="vertical" />
          </Center>
          <Box flex="1" p={5} overflow="auto">
            {!ready && 'Please wait...'}
            {ready && (
              <div>
                {!authorized && (
                  // <AuthorizeButton gapi={gapi} authOptions={authOptions} />
                  <Box>~ Auth</Box>
                )}
                {authorized && (
                  <div>
                    <ViewSelector
                      gapi={gapi}
                      onChange={viewId => setViewId(viewId)}
                    />
                    <div>
                      <SessionsByDateChart gapi={gapi} viewId={viewId} />
                      <SessionsBySourceChart gapi={gapi} viewId={viewId} />
                    </div>
                    <div>
                      <SignOutButton gapi={gapi} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Analytics
