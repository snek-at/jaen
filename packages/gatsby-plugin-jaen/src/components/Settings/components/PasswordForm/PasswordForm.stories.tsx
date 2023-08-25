import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PasswordForm} from './PasswordForm.js'
export default {
  title: 'Components/PasswordForm',
  component: PasswordForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PasswordForm>

type ComponentProps = React.ComponentProps<typeof PasswordForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PasswordForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
