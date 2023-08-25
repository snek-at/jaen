import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {EditButton} from './EditButton.js'
export default {
  title: 'Components/EditButton',
  component: EditButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof EditButton>

type ComponentProps = React.ComponentProps<typeof EditButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => <EditButton {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
