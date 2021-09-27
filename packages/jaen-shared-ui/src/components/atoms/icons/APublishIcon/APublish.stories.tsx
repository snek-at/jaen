import {Story, Meta} from '@storybook/react'

import APublishIcon from '.'

export default {
  title: 'Atoms/icons/APublishIcon',
  component: APublishIcon
} as Meta

const Template: Story = args => <APublishIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
