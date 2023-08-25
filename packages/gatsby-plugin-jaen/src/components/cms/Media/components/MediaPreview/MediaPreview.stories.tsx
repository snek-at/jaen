import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {MediaPreview} from './MediaPreview.js'
export default {
  title: 'Components/MediaPreview',
  component: MediaPreview,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MediaPreview>

type ComponentProps = React.ComponentProps<typeof MediaPreview>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MediaPreview {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
