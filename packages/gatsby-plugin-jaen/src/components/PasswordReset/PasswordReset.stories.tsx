import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PasswordReset} from './PasswordReset.js'
export default {
  title: 'Components/PasswordReset',
  component: PasswordReset,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PasswordReset>

type ComponentProps = React.ComponentProps<typeof PasswordReset>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PasswordReset {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
