import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {AccountForm} from './AccountForm.js'
export default {
  title: 'Components/AccountForm',
  component: AccountForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof AccountForm>

type ComponentProps = React.ComponentProps<typeof AccountForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <AccountForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
