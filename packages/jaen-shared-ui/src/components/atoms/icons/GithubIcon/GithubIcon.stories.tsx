import {Story, Meta} from '@storybook/react'

import GithubIcon from '.'

export default {
  title: 'Atoms/icons/GithubIcon',
  component: GithubIcon
} as Meta

const Template: Story = args => <GithubIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
