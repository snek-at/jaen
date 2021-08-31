import {Skeleton} from '@chakra-ui/react'
import {Meta, Story} from '@storybook/react'
import React from 'react'

import SFBWrapper, {SFBWrapperProps} from '.'

export default {
  title: 'Molecules/SFBWrapper',
  component: SFBWrapper
} as Meta

const Template: Story<SFBWrapperProps> = args => (
  <SFBWrapper {...args}>
    <Skeleton height={250} />
  </SFBWrapper>
)

export const Primary: Story<SFBWrapperProps> = Template.bind({})

Primary.args = {
  onDeleteClick: () => null
}
