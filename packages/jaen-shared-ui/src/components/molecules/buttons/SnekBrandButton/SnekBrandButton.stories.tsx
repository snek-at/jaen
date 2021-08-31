import {Story, Meta} from '@storybook/react'

import SnekBrandButton from '.'

export default {
  title: 'Molecules/buttons/SnekBrandButton',
  component: SnekBrandButton
} as Meta

const Template: Story = args => <SnekBrandButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
