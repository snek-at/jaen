import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {MenuButton} from './MenuButton'
export default {
  title: 'shared/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MenuButton>

type ComponentProps = React.ComponentProps<typeof MenuButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MenuButton {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
