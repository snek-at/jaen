import {AddIcon, DeleteIcon} from '@chakra-ui/icons'
import {HStack, Text} from '@chakra-ui/react'
import {Meta, Story} from '@storybook/react'
import React from 'react'

import ContextMenu, {ContextMenuProps} from '.'

export default {
  title: 'Atoms/ContextMenu',
  component: ContextMenu
} as Meta

const Template: Story<ContextMenuProps> = args => <ContextMenu {...args} />

export const Primary: Story<ContextMenuProps> = Template.bind({})

Primary.args = {
  items: [
    {
      _type: 'ITEM',
      content: (
        <HStack spacing={2}>
          <AddIcon />
          <Text>Add page</Text>
        </HStack>
      )
    },
    {_type: 'DIVIDER'},
    {
      _type: 'ITEM',
      content: (
        <HStack spacing={2}>
          <DeleteIcon />
          <Text>Delete</Text>
        </HStack>
      )
    }
  ]
}
