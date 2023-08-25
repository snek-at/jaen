import {Box, Link as ChakraLink} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'

import {Field} from '../index'

export const Image = ({name, defaultValue, alt, ...rest}: any) => {
  return (
    <Box {...rest}>
      <Field.Image name={name} defaultValue={defaultValue} alt={alt} />
    </Box>
  )
}

Image.defaultProps = {
  name: () => `image-${(Math.random() + 1).toString(36).substring(7)}`,
  defaultValue: 'https://via.placeholder.com/150'
}

export const Link: React.FC<{
  to: string
  children: React.ReactNode
}> = ({to, children}) => {
  // Check if link is internal or external
  if (to.startsWith('/')) {
    return (
      <ChakraLink as={GatsbyLink} to={to}>
        {children}
      </ChakraLink>
    )
  }

  // External link
  return (
    <ChakraLink href={to} isExternal>
      {children}
    </ChakraLink>
  )
}

Link.defaultProps = {
  to: '/',
  children: 'My Link'
}
