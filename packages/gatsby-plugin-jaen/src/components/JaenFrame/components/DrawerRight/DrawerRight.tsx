import {
  Avatar,
  AvatarBadge,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import {useRef} from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'
import {
  NavigationGroups,
  NavigationGroupsProps
} from '../NavigationGroups/index'

export interface DrawerRightProps {
  user: {
    username: string
    firstName?: string
    lastName?: string
    avatarURL?: string
  }
  navigationGroups: NavigationGroupsProps['groups']

  isBadgeVisible?: boolean
}

export const DrawerRight: React.FC<DrawerRightProps> = ({
  navigationGroups,
  user,
  isBadgeVisible
}) => {
  const {isOpen, onClose, onToggle} = useDisclosure()

  const initialFocusRef = useRef<HTMLButtonElement>(null)

  const colorMode = useColorMode()

  return (
    <>
      <Avatar
        as="button"
        aria-label="Open user menu"
        p="0"
        m="0"
        size="sm"
        cursor="pointer"
        src={user.avatarURL}
        onClick={onToggle}>
        <AvatarBadge
          boxSize="1.25em"
          bg="pink.500"
          visibility={isBadgeVisible ? 'visible' : 'hidden'}
        />
      </Avatar>
      <Drawer
        placement="right"
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <Box id="coco">
          <DrawerContent borderLeftRadius="xl">
            <DrawerHeader p="4">
              <HStack justifyContent="space-between">
                <Stack>
                  <HStack>
                    <Avatar size="sm" src={user.avatarURL} />
                    <Stack spacing="0.5">
                      <Text fontSize="sm" fontWeight="bold" lineHeight="none">
                        {user.username}
                      </Text>
                      <Text fontSize="sm" color="muted" lineHeight="none">
                        {user.firstName} {user.lastName}
                      </Text>
                    </Stack>
                  </HStack>
                </Stack>

                <DrawerCloseButton
                  ref={initialFocusRef}
                  pos="static"
                  onClick={onClose}
                />
              </HStack>
            </DrawerHeader>
            <DrawerBody p="4" display="flex" flexDirection="column">
              <NavigationGroups groups={navigationGroups} onClick={onClose} />
              <Spacer />
              <HStack justifyContent="space-between"></HStack>
            </DrawerBody>

            <DrawerFooter>
              <IconButton
                size="sm"
                variant="outline"
                icon={
                  <Icon
                    as={colorMode.colorMode === 'light' ? FaSun : FaMoon}
                    color="brand.500"
                  />
                }
                onClick={colorMode.toggleColorMode}
                aria-label="Toggle color mode"
              />
            </DrawerFooter>
          </DrawerContent>
        </Box>
      </Drawer>
    </>
  )
}
