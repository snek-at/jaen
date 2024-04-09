import {Menu} from 'lucide-react'

import {Button} from '../../../../components/ui/button'
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
import {FaBars} from '@react-icons/all-files/fa/FaBars'
import {JaenFullLogo} from '../../../shared/JaenLogo/JaenLogo'
import {
  NavigationGroups,
  NavigationGroupsProps
} from '../NavigationGroups/index'

export interface DrawerLeftProps {
  navigationGroups: NavigationGroupsProps['groups']
  logo?: JSX.Element
  version: string
}

export const DrawerLeft: React.FC<DrawerLeftProps> = ({
  navigationGroups,
  logo,
  version
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="my-auto">
          <Menu
            className="w-4 h-4"
            style={{
              color: 'var(--chakra-colors-brand-500)'
            }}
          />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <div className="max-w-xs">{logo || <JaenFullLogo />}</div>

          {/* <HStack justifyContent="space-between">
            <Box h="full" maxW="12rem">
              {logo || <JaenFullLogo />}
            </Box>
            <MenuButton items={[]} />
          </HStack> */}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <NavigationGroups groups={navigationGroups} />
        </div>

        <SheetFooter>
          <p>{version}</p>
        </SheetFooter>
      </SheetContent>
      {/* 
      <Drawer
        placement="left"
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <Box id="coco">
          <DrawerContent borderRightRadius="xl">
            <DrawerHeader p="4">
              <HStack justifyContent="space-between">
                <Box h="full" maxW="12rem">
                  {logo || <JaenFullLogo />}
                </Box>
                <DrawerCloseButton
                  ref={initialFocusRef}
                  pos="static"
                  onClick={onClose}
                />
              </HStack>
            </DrawerHeader>
            <DrawerBody p="4" display="flex" flexDirection="column">
              <NavigationGroups groups={navigationGroups} onClick={onClose} />
            </DrawerBody>
            <DrawerFooter display="flex" justifyContent="space-between">
              <JaenFullLogo h="8" w="auto" cursor="pointer" />

              <Text fontSize="xs" color="muted">
                {version}
              </Text>
            </DrawerFooter>
          </DrawerContent>
        </Box>
      </Drawer> */}
    </Sheet>
  )
}
