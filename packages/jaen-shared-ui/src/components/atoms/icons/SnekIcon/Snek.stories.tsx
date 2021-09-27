import {Story, Meta} from '@storybook/react'

import SnekIcon from '.'

export default {
  title: 'Atoms/icons/SnekIcon',
  component: SnekIcon
} as Meta

const Template: Story = args => <SnekIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
