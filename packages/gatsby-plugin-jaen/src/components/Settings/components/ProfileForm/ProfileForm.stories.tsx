import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {ProfileForm} from './ProfileForm.js'
export default {
  title: 'Components/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ProfileForm>

type ComponentProps = React.ComponentProps<typeof ProfileForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <ProfileForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
