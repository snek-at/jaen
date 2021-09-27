import {Story, Meta} from '@storybook/react'

import FolderOpenIcon from '.'

export default {
  title: 'Atoms/icons/FolderOpenIcon',
  component: FolderOpenIcon
} as Meta

const Template: Story = args => <FolderOpenIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
