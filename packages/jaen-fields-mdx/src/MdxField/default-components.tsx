import {Box, Link as ChakraLink} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'
import {Field} from '@atsnek/jaen'

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
  isExternal?: boolean
  children: React.ReactNode
}> = ({to, children, ...props}) => {
  const isExternal =
    props.isExternal !== undefined
      ? props.isExternal
      : to.startsWith('http://') || to.startsWith('https://')

  if (isExternal) {
    return (
      <ChakraLink href={to} isExternal>
        {children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink as={GatsbyLink} to={to}>
      {children}
    </ChakraLink>
  )
}

Link.defaultProps = {
  to: '/',
  children: 'My Link'
}
