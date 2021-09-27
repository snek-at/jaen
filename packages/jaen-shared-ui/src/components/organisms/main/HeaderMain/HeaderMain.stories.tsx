import {Story, Meta} from '@storybook/react'

import MainHeader, {HeaderMainProps} from '.'

export default {
  title: 'Organisms/main/HeaderMain',
  component: MainHeader
} as Meta

const Template: Story<HeaderMainProps> = args => <MainHeader {...args} />

export const Primary = Template.bind({})

Primary.args = {}
