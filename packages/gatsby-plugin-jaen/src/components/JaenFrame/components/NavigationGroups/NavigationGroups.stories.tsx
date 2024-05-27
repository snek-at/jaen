import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {NavigationGroups} from './NavigationGroups'
export default {
  title: 'JaenFrame/NavigationGroups',
  component: NavigationGroups,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof NavigationGroups>

type ComponentProps = React.ComponentProps<typeof NavigationGroups>

// Create a template for the component
const Template: Story<ComponentProps> = args => <NavigationGroups {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
