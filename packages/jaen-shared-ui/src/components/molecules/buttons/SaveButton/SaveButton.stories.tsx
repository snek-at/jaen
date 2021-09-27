import {Story, Meta} from '@storybook/react'

import SaveButton from '.'

export default {
  title: 'Molecules/buttons/SaveButton',
  component: SaveButton
} as Meta

const Template: Story = args => <SaveButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
