import {Story, Meta} from '@storybook/react'

import PublishButton, {PublishButtonProps} from '.'

export default {
  title: 'Molecules/buttons/PublishButton',
  component: PublishButton
} as Meta

const Template: Story<PublishButtonProps> = args => <PublishButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onPublishClick: () => null
}

export const Disabled = Template.bind({})

Disabled.args = {
  onPublishClick: () => null,
  disabled: true
}
