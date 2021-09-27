import {Story, Meta} from '@storybook/react'

import LoginMain, {LoginMainProps} from '.'

export default {
  title: 'Organisms/main/Login',
  component: LoginMain
} as Meta

const Template: Story<LoginMainProps> = args => <LoginMain {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onLogin: () => undefined,
  onGuestLogin: () => undefined
}
