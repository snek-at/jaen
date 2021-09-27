import {Story, Meta} from '@storybook/react'

import VersionButton from '.'

export default {
  title: 'Molecules/buttons/VersionButton',
  component: VersionButton
} as Meta

const Template: Story = args => <VersionButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
