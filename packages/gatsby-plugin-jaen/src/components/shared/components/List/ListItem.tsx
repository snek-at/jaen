import {
  Circle,
  Flex,
  Heading,
  Stack,
  StackProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export interface ListItemProps extends StackProps {
  title: string
  subTitle: string
  circleColor: string
  icon?: React.ReactElement
  isLastItem?: boolean
}

export const ListItem: React.FC<ListItemProps> = props => {
  const {
    title,
    subTitle,
    circleColor,
    icon,
    isLastItem,
    children,
    ...stackProps
  } = props

  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg={circleColor}
          size="12"
          borderWidth="1px"
          color="fg.inverted"
          borderColor="border.emphasized">
          {icon}
        </Circle>
        {!isLastItem && (
          <Flex
            flex="1"
            borderRightWidth="1px"
            mb="-12"
            borderColor="border.emphasized"
          />
        )}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Stack>
          <Text fontSize="md" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="sm">{subTitle}</Text>
        </Stack>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  )
}
