import {Story, Meta} from '@storybook/react'

import Analytics from '.'

export default {
  title: 'Organisms/Analytics',
  component: Analytics
} as Meta

const Template: Story = args => <Analytics {...args} />

export const Primary = Template.bind({})
