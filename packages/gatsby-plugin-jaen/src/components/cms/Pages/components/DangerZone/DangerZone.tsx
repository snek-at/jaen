import {
  Button,
  HStack,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {FC} from 'react'
import {IconType} from 'react-icons/lib'

import {Link} from '../../../../shared/Link'

interface Action {
  title: string
  description: string
  buttonText: string
  icon: IconType
  onClick: (index: number) => void
  isDisabled?: boolean
}

export interface DangerZoneProps {
  actions: Action[]
}

export const DangerZone: FC<DangerZoneProps> = ({actions}) => {
  const borderColor = useColorModeValue('red.500', 'red.200')

  return (
    <List
      spacing="4"
      p="4"
      border="2px"
      borderRadius="md"
      borderColor={borderColor}>
      {actions.map((action, index) => (
        <ListItem key={index}>
          <HStack justifyContent="space-between">
            <Stack spacing="1">
              <Text fontWeight="bold">{action.title}</Text>
              <Text fontSize="sm">{action.description}</Text>
            </Stack>
            <Link
              as={Button}
              leftIcon={<action.icon />}
              variant="outline"
              colorScheme="red"
              onClick={() => action.onClick(index)}
              isDisabled={action.isDisabled}>
              {action.buttonText}
            </Link>
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

export default DangerZone
