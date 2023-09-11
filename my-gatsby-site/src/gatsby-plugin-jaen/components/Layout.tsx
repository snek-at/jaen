import {LayoutProps, useWidget} from '@atsnek/jaen'
import {Box, Heading, HStack, Button} from '@chakra-ui/react'

const Layout: React.FC<LayoutProps> = ({children, pageProps}) => {
  const [widget, setWidget] = useWidget<string>('Header_Title', {
    defaultData: 'Hello World'
  })

  return (
    <Box>
      <Box
        as="header"
        bg="gray.800"
        color="white"
        p="4"
        pos="sticky"
        top="0"
        zIndex="sticky">
        <HStack>
          <Heading as="h1">{widget.data}</Heading>

          <Button
            onClick={() => {
              setWidget(`Random Title ${Math.floor(Math.random() * 100)}`)
            }}>
            Random Title
          </Button>
        </HStack>
      </Box>

      {children}
    </Box>
  )
}

export default Layout
