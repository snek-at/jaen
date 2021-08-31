import {Story, Meta} from '@storybook/react'

import GithubButton from '.'

export default {
  title: 'Molecules/buttons/Github',
  component: GithubButton
} as Meta

const Template: Story = args => <GithubButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
