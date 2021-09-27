import {Story, Meta} from '@storybook/react'

import ADmToggleIcon from '.'

export default {
  title: 'Atoms/icons/ADmToggleIcon',
  component: ADmToggleIcon
} as Meta

const Template: Story = args => <ADmToggleIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
