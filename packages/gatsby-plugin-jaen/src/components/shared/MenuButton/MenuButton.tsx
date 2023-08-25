import {
  As,
  Box,
  Button,
  ButtonProps,
  Icon,
  Menu,
  MenuButton as ChakraMenuButton,
  MenuDivider,
  MenuItem as ChakraMenuItem,
  MenuList,
  MenuProps
} from '@chakra-ui/react'
import {FaCaretDown} from 'react-icons/fa'
import {Link} from '../Link/Link'

export interface MenuItem {
  icon?: As
  label: string
  path?: string
  onClick?: () => void
  divider?: boolean
}

export interface MenuButtonProps extends ButtonProps {
  items?: Record<string, MenuItem>
  renderItems?: (items: React.ReactNode) => React.ReactNode
  menuPlacement?: MenuProps['placement']
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  items = {},
  renderItems,
  menuPlacement,
  ...buttonProps
}) => {
  const rendredItems = Object.entries(items).map(([key, value]) => {
    return (
      <Box key={key} mx="2">
        <ChakraMenuItem
          as={Link}
          variant="ghost"
          icon={
            value.icon ? <Icon as={value.icon} color="brand.500" /> : undefined
          }
          onClick={value.onClick}
          to={value.path}>
          {value.label}
        </ChakraMenuItem>
        {value.divider && <MenuDivider borderColor="border.emphasized" />}
      </Box>
    )
  })

  return (
    <Menu placement={menuPlacement} isLazy>
      <ChakraMenuButton
        as={Button}
        rightIcon={<Icon as={FaCaretDown} />}
        size="sm"
        variant="outline"
        {...buttonProps}
      />
      <MenuList>
        {renderItems ? renderItems(rendredItems) : rendredItems}
      </MenuList>
    </Menu>
  )
}
