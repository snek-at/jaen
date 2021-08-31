import {Story, Meta} from '@storybook/react'

import JaenToggleButton, {JaenToggleButtonProps} from '.'

export default {
  title: 'Molecules/buttons/JaenToggleButton',
  component: JaenToggleButton
} as Meta

const Template: Story<JaenToggleButtonProps> = args => (
  <JaenToggleButton {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  onClick: () => null
}
