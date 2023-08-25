import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Signup} from './Signup.js'
export default {
  title: 'Components/Signup',
  component: Signup,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Signup>

type ComponentProps = React.ComponentProps<typeof Signup>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Signup {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
