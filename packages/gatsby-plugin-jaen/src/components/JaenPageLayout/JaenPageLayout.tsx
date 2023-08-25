import {Box, Container} from '@chakra-ui/react'

import {Footer} from './components/Footer/Footer'

export interface JaenPageLayoutProps {
  layout?: 'full' | 'form' | 'content'
  children: React.ReactNode
}

export const JaenPageLayout: React.FC<JaenPageLayoutProps> = ({
  layout = 'content',
  ...props
}) => {
  return (
    <Box
      id="coco"
      pt={layout === 'full' ? '0' : '4rem'}
      minH="calc(100dvh - 4rem)">
      {layout === 'full' ? (
        <Box>{props.children}</Box>
      ) : (
        <Container maxW={layout === 'form' ? 'container.md' : 'container.xl'}>
          {props.children}
        </Container>
      )}

      <Container maxW={layout === 'full' ? 'full' : 'container.xl'}>
        <Footer
          links={[
            {
              label: 'Imprint',
              path: '/imprint'
            },
            {
              label: 'Privacy Policy',
              path: '/privacy-policy'
            },
            {
              label: 'Terms of Service',
              path: '/terms-of-service'
            },
            {
              label: 'Contact',
              path: '/contact'
            },
            {
              label: 'About',
              path: '/about'
            }
          ]}
        />
      </Container>
    </Box>
  )
}
