import {Story, Meta} from '@storybook/react'

import SearchIcon from '.'

export default {
  title: 'Atoms/icons/SearchIcon',
  component: SearchIcon
} as Meta

const Template: Story = args => <SearchIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
