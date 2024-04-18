import {Box, Link as ChakraLink, LinkProps} from '@chakra-ui/react'
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

const linkProps: LinkProps = {
  position: 'relative',
  display: 'inline-block',
  color: 'brand.600',
  textDecoration: 'none',
  w: 'fit-content',
  _hover: {
    color: 'brand.600',
    _before: {
      transform: 'scaleX(1)'
    }
  },
  _before: {
    content: '""',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '2px',
    bottom: -0.5,
    left: 0,
    backgroundColor: 'brand.600',
    transform: 'scaleX(0)',
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease'
  }
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
      <ChakraLink href={to} isExternal {...linkProps}>
        {children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink as={GatsbyLink} to={to} {...linkProps}>
      {children}
    </ChakraLink>
  )
}

Link.defaultProps = {
  to: '/',
  children: 'My Link'
}
