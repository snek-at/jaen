import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {MediaGrid} from './MediaGrid.js'
export default {
  title: 'Components/MediaGrid',
  component: MediaGrid,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MediaGrid>

type ComponentProps = React.ComponentProps<typeof MediaGrid>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MediaGrid {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
