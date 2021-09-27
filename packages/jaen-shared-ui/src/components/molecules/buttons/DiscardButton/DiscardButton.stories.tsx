import {Story, Meta} from '@storybook/react'

import DiscardButton, {DiscardButtonProps} from '.'

export default {
  title: 'Molecules/buttons/DiscardButton',
  component: DiscardButton
} as Meta

const Template: Story<DiscardButtonProps> = args => <DiscardButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onDiscardClick: () => null
}
