import {Story, Meta} from '@storybook/react'

import MainFooter, {FooterMainProps} from '.'

export default {
  title: 'Organisms/main/MainFooter',
  component: MainFooter
} as Meta

const Template: Story<FooterMainProps> = args => <MainFooter {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onLogout: () => {}
}
