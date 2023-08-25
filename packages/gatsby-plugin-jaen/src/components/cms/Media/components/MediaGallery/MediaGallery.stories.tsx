import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {MediaGallery} from './MediaGallery.js'
export default {
  title: 'Components/MediaGallery',
  component: MediaGallery,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MediaGallery>

type ComponentProps = React.ComponentProps<typeof MediaGallery>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MediaGallery {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
