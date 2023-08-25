import {Box, Container, Stack, Wrap, WrapItem} from '@chakra-ui/react'
import {Link} from '../../../shared/Link/Link'

import Logo from '../../../Logo'

export interface FooterProps {
  links: Array<{
    label: string
    path?: string
    onClick?: () => void
  }>
}

export const Footer: React.FC<FooterProps> = props => {
  return (
    <Box mt="24" borderTop="1px solid" borderColor="border.emphasized">
      <Container py="8" maxW="8xl">
        <Stack
          spacing="8"
          flexDir={{
            base: 'column-reverse',
            md: 'row'
          }}>
          <Box maxW="xs" mx="auto">
            <Logo />
          </Box>

          <Wrap w="full" spacing={4} justify="center">
            {props.links.map((link, index) => {
              return (
                <WrapItem key={index}>
                  <Link to={link.path} onClick={link.onClick}>
                    {link.label}
                  </Link>
                </WrapItem>
              )
            })}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  )
}
