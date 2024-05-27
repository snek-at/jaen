import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackProps,
  Text
} from '@chakra-ui/react'
import * as React from 'react'

import type {ListItemProps} from './ListItem'

export interface ListProps extends StackProps {
  label?: string
}

export const List: React.FC<ListProps> = props => {
  const {children, label, ...stackProps} = props
  const items = React.useMemo(
    () =>
      React.Children.toArray(children)
        .filter<React.ReactElement<ListItemProps>>(React.isValidElement)
        .map((item, index, array) =>
          index + 1 === array.length
            ? React.cloneElement(item, {isLastItem: true})
            : item
        ),
    [children]
  )
  return (
    <Card variant="outline">
      <CardHeader>
        {label && (
          <Text noOfLines={1} pb="1">
            {label}
          </Text>
        )}
      </CardHeader>
      <CardBody>
        <Stack as="ul" {...stackProps}>
          {items}
        </Stack>
      </CardBody>
    </Card>
  )
}
