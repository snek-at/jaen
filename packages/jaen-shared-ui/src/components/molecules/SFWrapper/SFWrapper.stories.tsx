import {Skeleton} from '@chakra-ui/react'
import {Meta, Story} from '@storybook/react'
import React from 'react'

import SFWrapper, {SFWrapperProps} from '.'

export default {
  title: 'Molecules/SFWrapper',
  component: SFWrapper
} as Meta

const Template: Story<SFWrapperProps> = args => (
  <SFWrapper {...args}>
    <Skeleton height={250} />
  </SFWrapper>
)

export const Primary: Story<SFWrapperProps> = Template.bind({})

Primary.args = {
  displayName: 'name',
  blockTypes: [
    {
      name: 'TestBlock',
      onClick: () => alert('clicked TestBlock')
    }
  ]
}
