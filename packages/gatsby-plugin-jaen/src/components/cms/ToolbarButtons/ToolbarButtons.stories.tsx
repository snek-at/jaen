import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {ToolbarButtons} from './ToolbarButtons.js'
export default {
  title: 'Components/ToolbarButtons',
  component: ToolbarButtons,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ToolbarButtons>

type ComponentProps = React.ComponentProps<typeof ToolbarButtons>

// Create a template for the component
const Template: Story<ComponentProps> = args => <ToolbarButtons {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
