import {Story, Meta} from '@storybook/react'

import CopyrightButton from '.'

export default {
  title: 'Molecules/buttons/CopyrightButton',
  component: CopyrightButton
} as Meta

const Template: Story = args => <CopyrightButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
