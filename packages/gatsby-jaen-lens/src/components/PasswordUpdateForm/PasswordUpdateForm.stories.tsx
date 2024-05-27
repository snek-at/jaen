import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PasswordUpdateForm} from './PasswordUpdateForm.js'
export default {
  title: 'Components/PasswordUpdateForm',
  component: PasswordUpdateForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PasswordUpdateForm>

type ComponentProps = React.ComponentProps<typeof PasswordUpdateForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PasswordUpdateForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
