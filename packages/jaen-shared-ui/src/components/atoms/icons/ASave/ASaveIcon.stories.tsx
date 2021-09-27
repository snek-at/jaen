import {Story, Meta} from '@storybook/react'

import ASaveIcon from '.'

export default {
  title: 'Atoms/icons/ASaveIcon',
  component: ASaveIcon
} as Meta

const Template: Story = args => <ASaveIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
