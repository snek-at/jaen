import {Story, Meta} from '@storybook/react'

import ExitButton, {ExitButtonProps} from '.'

export default {
  title: 'Molecules/buttons/Exit',
  component: ExitButton
} as Meta

const Template: Story<ExitButtonProps> = args => <ExitButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onClick: () => alert('Clicked')
}
