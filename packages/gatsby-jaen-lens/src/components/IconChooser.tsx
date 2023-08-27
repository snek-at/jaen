import {
  Button,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text
} from '@chakra-ui/react'
import {useState} from 'react'
import {FaGlobe} from 'react-icons/fa'
import * as SIIcons from 'react-icons/si'
import {useDebouncedCallback} from 'use-debounce'

export const SIIconKeys = Object.keys(SIIcons) as Array<keyof typeof SIIcons>

interface IconChooserProps {
  isEditing?: boolean
  icon?: keyof typeof SIIcons
  setIcon: (icon: string) => void
}
export const IconChooser: React.FC<IconChooserProps> = props => {
  const [icon, setIcon] = useState<keyof typeof SIIcons | 'FaGlobe'>(
    props.icon || 'FaGlobe'
  )

  const [searchQuery, setSearchQuery] = useState<string>('')

  // Filter icons based on search query and limit the rendering to 10 items
  const filteredIcons = SIIconKeys.filter(key =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10)

  const handleFilterChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
  }, 300)

  if (!props.isEditing) {
    return (
      <IconButton
        variant="ghost"
        aria-label="Icon"
        icon={
          <Icon as={icon === 'FaGlobe' ? FaGlobe : SIIcons[icon]} boxSize="6" />
        }
      />
    )
  }

  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        w="3xs"
        variant="outline"
        leftIcon={<Icon as={icon === 'FaGlobe' ? FaGlobe : SIIcons[icon]} />}>
        <Text>{icon.replace('Si', '')}</Text>
      </MenuButton>
      <MenuList>
        <Stack>
          <Input
            w="unset"
            size="sm"
            mx="2"
            placeholder="Search icons..."
            onChange={e => {
              handleFilterChange(e.target.value)
            }}
          />
          <Stack maxH="xs" overflow="auto">
            {filteredIcons.length === 0 && <Text>No icons found</Text>}

            {filteredIcons.map(key => {
              const IconComponent = SIIcons[key]
              return (
                <MenuItem
                  key={key}
                  icon={<Icon as={IconComponent} />}
                  onClick={() => {
                    setIcon(key)
                    props.setIcon(key)
                  }}>
                  {key.replace('Si', '')}
                </MenuItem>
              )
            })}
          </Stack>
        </Stack>
      </MenuList>
    </Menu>
  )
}
