import {Story, Meta} from '@storybook/react'

import ADiscardIcon from '.'

export default {
  title: 'Atoms/icons/ADiscardIcon',
  component: ADiscardIcon
} as Meta

const Template: Story = args => <ADiscardIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
