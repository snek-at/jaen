import {Story, Meta} from '@storybook/react'

import ExitIcon from '.'

export default {
  title: 'Atoms/icons/ExitIcon',
  component: ExitIcon
} as Meta

const Template: Story = args => <ExitIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
