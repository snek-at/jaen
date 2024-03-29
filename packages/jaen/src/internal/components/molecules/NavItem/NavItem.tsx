import {Box, HStack} from '@chakra-ui/react'
import {BsCaretRightFill} from 'react-icons/bs'
import * as React from 'react'

interface NavItemProps {
  href?: string
  label: string
  subtle?: boolean
  active?: boolean
  icon: React.ReactElement
  endElement?: React.ReactElement
  children?: React.ReactNode
  onClick?: () => void
}

export const NavItem = (props: NavItemProps) => {
  const {active, subtle, icon, children, label, endElement, onClick} = props

  return (
    <HStack
      onClick={onClick}
      w="full"
      px="3"
      py="2"
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      color={active ? 'currentcolor' : 'gray.400'}
      _hover={{bg: 'gray.700'}}
      _active={{bg: 'gray.600'}}>
       {icon}
      <Box
        flex="1"
        fontWeight="inherit"
        color={subtle ? 'gray.400' : 'white'}>
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}
