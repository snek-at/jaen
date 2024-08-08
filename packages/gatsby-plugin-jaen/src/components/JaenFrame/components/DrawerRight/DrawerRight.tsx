import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from '../../../../components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../../../components/ui/sheet'

import {cn} from '../../../../lib/utils'
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
  const fallbackName = user.username
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="bg-red-300">
          <AvatarImage src={user.avatarURL!} />
          <AvatarFallback>{fallbackName}</AvatarFallback>
          {isBadgeVisible && (
            <AvatarBadge>
              <span className="flex">
                <span className="absolute w-full h-full rounded-full opacity-75 bg-pink-500 animate-ping"></span>

                <span className="w-full h-full rounded-full bg-pink-500"></span>
              </span>
            </AvatarBadge>
          )}
        </Avatar>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{user.username}</SheetTitle>
          <SheetDescription>
            {user.firstName} {user.lastName}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <NavigationGroups groups={navigationGroups} />
        </div>
      </SheetContent>

      {/* <Drawer
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
                    <Avatar
                      size="sm"
                      name={user.username}
                      src={user.avatarURL}
                    />
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
      </Drawer> */}
    </Sheet>
  )
}
