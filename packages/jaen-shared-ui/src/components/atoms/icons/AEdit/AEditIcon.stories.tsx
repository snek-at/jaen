import {Story, Meta} from '@storybook/react'

import AEditIcon from '.'

export default {
  title: 'Atoms/icons/AEditIcon',
  component: AEditIcon
} as Meta

const Template: Story = args => <AEditIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
