import {Primary as HotbarMain} from '@components/organisms/main/HotbarMain/HeaderMain.stories'
import {Primary as TabsMain} from '@components/organisms/main/TabsMain/TabsMain.stories'
import {Story, Meta} from '@storybook/react'

import {Main, MainProps} from '.'

export default {
  title: 'App/Main',
  component: Main
} as Meta

const Template: Story<MainProps> = args => <Main {...args} />

export const Authenticated = Template.bind({})

Authenticated.args = {
  hotbar: HotbarMain.args as any,
  tabs: TabsMain.args as any,
  authenticated: true
}

export const Unauthenticated = Authenticated.bind({})

Unauthenticated.args = {
  authenticated: false
}
