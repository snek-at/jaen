import {
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
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {useRef} from 'react'
import {FaBars} from 'react-icons/fa'
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
  const {isOpen, onClose, onToggle} = useDisclosure()

  const initialFocusRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <IconButton
        aria-label="Open main menu"
        icon={<Icon as={FaBars} fontSize="lg" color="brand.500 !important" />}
        size="sm"
        onClick={onToggle}
        variant="outline"
      />
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
                <Box h="12">{logo || <JaenFullLogo />}</Box>
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
      </Drawer>
    </>
  )
}
