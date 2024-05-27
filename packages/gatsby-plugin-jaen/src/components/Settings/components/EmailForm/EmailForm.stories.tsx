import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {EmailForm} from './EmailForm.js'
export default {
  title: 'Components/EmailForm',
  component: EmailForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof EmailForm>

type ComponentProps = React.ComponentProps<typeof EmailForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <EmailForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
