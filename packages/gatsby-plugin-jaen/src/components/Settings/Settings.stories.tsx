import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Settings} from './Settings.js'
export default {
  title: 'Components/Settings',
  component: Settings,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Settings>

type ComponentProps = React.ComponentProps<typeof Settings>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Settings {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
