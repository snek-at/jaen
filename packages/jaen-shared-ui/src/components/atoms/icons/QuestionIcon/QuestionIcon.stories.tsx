import {Story, Meta} from '@storybook/react'

import QuestionIcon from '.'

export default {
  title: 'Atoms/icons/QuestionIcon',
  component: QuestionIcon
} as Meta

const Template: Story = args => <QuestionIcon {...args} />

export const Primary = Template.bind({})

Primary.args = {}
