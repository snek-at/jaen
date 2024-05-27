import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {MediaItem} from './MediaItem.js'
export default {
  title: 'Components/MediaItem',
  component: MediaItem,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MediaItem>

type ComponentProps = React.ComponentProps<typeof MediaItem>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MediaItem {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
