import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Divider,
  Box,
  useDisclosure,
  Portal,
  ChakraProvider
} from '@chakra-ui/react'
import {JaenToggleButton, SnekButton} from '@components/molecules/buttons'
import {
  HeaderMain,
  HotbarMain,
  FooterMain,
  HotbarMainProps,
  TabsMainProps,
  TabsMain,
  LoginMain,
  LoginMainProps,
  FooterMainProps
} from '@components/organisms/main'
import React, {useRef} from 'react'

export type MainProps = {
  hotbar: HotbarMainProps
  tabs: TabsMainProps
  authenticated: boolean
  login: LoginMainProps
  footer: FooterMainProps
}

export const Main: React.FC<MainProps> = props => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>()

  return (
    <Portal>
      <Box zIndex="9999">
        <Box pos="fixed" bottom={5} right={5} ref={btnRef as any}>
          <JaenToggleButton ref={btnRef as any} onClick={onOpen} />
        </Box>
        <Drawer
          placement="right"
          size="6xl"
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef as any}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            {props.authenticated ? (
              <>
                <DrawerHeader>
                  <HeaderMain />
                </DrawerHeader>
                <Divider />
                <DrawerBody pd={0} mt={2}>
                  <HotbarMain {...props.hotbar} />
                  <TabsMain {...props.tabs} />
                </DrawerBody>
                <Divider />
                <DrawerFooter py={2}>
                  <FooterMain {...props.footer} />
                </DrawerFooter>
              </>
            ) : (
              <>
                <DrawerHeader>
                  <SnekButton />
                </DrawerHeader>
                <DrawerBody pd={0} mt={2}>
                  <LoginMain {...props.login} />
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </Box>
    </Portal>
  )
}

// Wrap with ChakraProvider because the useColorMode hook is not compatible when
// using it inside a component library.

interface ChakraMainProps extends MainProps {
  chakraWorkaroundTheme: any
}

const ChakraMain: React.FC<ChakraMainProps> = ({
  chakraWorkaroundTheme,
  ...props
}) => (
  <ChakraProvider theme={chakraWorkaroundTheme}>
    <Main {...props} />
  </ChakraProvider>
)

export default ChakraMain
