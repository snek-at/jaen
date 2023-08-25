import {LayoutProps} from '@atsnek/jaen'
import {Box, Heading} from '@chakra-ui/react'

const Layout: React.FC<LayoutProps> = ({children, pageProps}) => {
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
        <Heading as="h1">My Site</Heading>
      </Box>

      {children}
    </Box>
  )
}

export default Layout
