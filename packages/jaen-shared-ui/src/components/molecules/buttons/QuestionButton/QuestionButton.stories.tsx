import {Story, Meta} from '@storybook/react'

import QuestionButton from '.'

export default {
  title: 'Molecules/buttons/QuestionButton',
  component: QuestionButton
} as Meta

const Template: Story = args => <QuestionButton {...args} />

export const Primary = Template.bind({})

Primary.args = {}
