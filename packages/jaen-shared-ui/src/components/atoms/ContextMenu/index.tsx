import {Box} from '@chakra-ui/layout'
import {
  Button,
  Divider,
  DividerProps,
  useColorModeValue
} from '@chakra-ui/react'
import {MouseEvent} from 'react'

type Item = {
  content?: JSX.Element
  onItemClick?: (e: MouseEvent<HTMLButtonElement>) => void
} & (
  | {
      _type: 'ITEM'
    }
  | (DividerProps & {_type: 'DIVIDER'})
)

export type ContextMenuProps = {
  items: Item[]
}

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const bg = useColorModeValue('white', 'gray.700')
  const itemBgColor = useColorModeValue('blue.100', 'blue.400')

  return (
    <Box
      maxW="3xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      onClick={e => {
        if (e.currentTarget !== e.target) {
          e.stopPropagation()
        }
      }}
      onContextMenu={e => {
        e.preventDefault()
        e.stopPropagation()
      }}>
      {props.items.map(({content, _type, onItemClick, ...props}, key) => (
        <Box mb={1} mt={1} key={key}>
          {_type === 'ITEM' && (
            <Button
              bg={'transparent'}
              borderRadius={0}
              isFullWidth
              _focus={{boxShadow: 'none !important'}}
              _hover={{bg: itemBgColor}}
              fontWeight="initial"
              fontSize="sm"
              justifyContent="flex-start"
              onClick={onItemClick}>
              {content}
            </Button>
          )}
          {_type === 'DIVIDER' && <Divider {...(props as DividerProps)} />}
        </Box>
      ))}
    </Box>
  )
}

export default ContextMenu
