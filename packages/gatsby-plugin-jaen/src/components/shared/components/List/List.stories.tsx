import {Icon, useColorModeValue} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FaRocket} from 'react-icons/fa'
import {List} from './List.js'
import {ListItem} from './ListItem.js'

export default {
  title: 'Molecules/List',
  component: List,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof List>

type ComponentProps = React.ComponentProps<typeof List>

export const Basic: Story<ComponentProps> = () => {
  return (
    <List label="List">
      <ListItem
        key="1"
        title="In progress"
        subTitle="Your website will be live in a few minutes."
        circleColor={useColorModeValue('orange.500', 'orange.300')}
        icon={<Icon as={FaRocket} boxSize="6" />}
      />
      ,
      <ListItem
        key="2"
        title="In progress"
        subTitle="Your website will be live in a few minutes."
        circleColor={useColorModeValue('orange.500', 'orange.300')}
        icon={<Icon as={FaRocket} boxSize="6" />}
      />
    </List>
  )
}
