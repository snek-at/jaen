import {Story, Meta} from '@storybook/react'

import DmToggleButton, {DmToggleButtonProps} from '.'

export default {
  title: 'Molecules/buttons/DmToggleButton',
  component: DmToggleButton
} as Meta

const Template: Story<DmToggleButtonProps> = args => <DmToggleButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onDmToggleChange: () => null
}
