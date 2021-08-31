import {Story, Meta} from '@storybook/react'

import FolderCloseIcon from '.'

export default {
  title: 'Atoms/icons/FolderCloseIcon',
  component: FolderCloseIcon
} as Meta

const Template: Story = args => <FolderCloseIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
