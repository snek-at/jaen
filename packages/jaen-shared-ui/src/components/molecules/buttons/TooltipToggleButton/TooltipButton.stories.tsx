import {Story, Meta} from '@storybook/react'

import TooltipButton from '.'

export default {
  title: 'Molecules/buttons/TooltipButton',
  component: TooltipButton
} as Meta

const Template: Story = args => <TooltipButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
