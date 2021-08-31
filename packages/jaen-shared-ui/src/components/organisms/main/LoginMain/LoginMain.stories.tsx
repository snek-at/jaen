import {Story, Meta} from '@storybook/react'

import LoginMain from '.'

export default {
  title: 'Organisms/main/Login',
  component: LoginMain
} as Meta

const Template: Story = args => <LoginMain {...args} />

export const Primary = Template.bind({})

Primary.args = {}
