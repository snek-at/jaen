import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Dashboard} from './Dashboard.js'
export default {
  title: 'Components/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Dashboard>

type ComponentProps = React.ComponentProps<typeof Dashboard>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Dashboard {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
