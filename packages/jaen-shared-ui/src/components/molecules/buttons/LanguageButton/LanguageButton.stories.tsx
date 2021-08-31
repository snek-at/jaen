import {Story, Meta} from '@storybook/react'

import LanguageButton from '.'

export default {
  title: 'Molecules/buttons/LanguageButton',
  component: LanguageButton
} as Meta

const Template: Story = args => <LanguageButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
