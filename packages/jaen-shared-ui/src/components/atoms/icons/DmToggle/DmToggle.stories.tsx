import {Story, Meta} from '@storybook/react'

import DmToggle, {DmToggleProps} from '.'

export default {
  title: 'Atoms/icons/DmToggle',
  component: DmToggle
} as Meta

const Template: Story<DmToggleProps> = args => <DmToggle {...args} />

export const DarkMode = Template.bind({})

DarkMode.args = {
  isDMEnabled: true
}

export const LightMode = Template.bind({})

LightMode.args = {
  isDMEnabled: false
}
