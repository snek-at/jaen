import {Story, Meta} from '@storybook/react'

import FileIcon from '.'

export default {
  title: 'Atoms/icons/FileIcon',
  component: FileIcon
} as Meta

const Template: Story = args => <FileIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
