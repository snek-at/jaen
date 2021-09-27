import {Story, Meta} from '@storybook/react'

import EditButton, {EditButtonProps} from '.'

export default {
  title: 'Molecules/buttons/Edit',
  component: EditButton
} as Meta

const Template: Story<EditButtonProps> = args => <EditButton {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onEditChange: () => null
}
