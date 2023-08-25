import {Button, Flex, HStack, Icon, StackDivider, Text} from '@chakra-ui/react'
import {FaEllipsisH, FaSignInAlt} from 'react-icons/fa'
import {JaenFullLogo} from '../shared/JaenLogo/JaenLogo'
import {Link} from '../shared/Link/Link'
import {MenuButton} from '../shared/MenuButton/MenuButton'

export interface JaenFrameActivationButtonProps {}

export const JaenFrameActivationButton: React.FC<JaenFrameActivationButtonProps> =
  () => {
    return (
      <>
        <HStack
          pos="fixed"
          bottom="5"
          left="50%"
          transform="translateX(-50%)"
          bg="bg.surface"
          p="2"
          rounded="full"
          divider={<StackDivider />}>
          <Link
            as={Button}
            to="/jaen"
            variant="ghost"
            rounded="full"
            size="sm"
            leftIcon={<Icon as={FaSignInAlt} />}>
            Log in to edit
          </Link>
          <MenuButton
            variant="ghost"
            rightIcon={undefined}
            rounded="full"
            menuPlacement="top-end"
            items={{
              login: {
                label: 'Login',
                icon: FaSignInAlt
              }
            }}
            renderItems={items => {
              return (
                <Flex flexDirection="column" alignItems="center" p={4}>
                  <JaenFullLogo width="full" height={8} />
                  <Text mt={2} textAlign="center">
                    Welcome to Jaen!
                  </Text>

                  {items}
                </Flex>
              )
            }}>
            <Icon as={FaEllipsisH} display="block" />
          </MenuButton>
        </HStack>
      </>
    )
  }
