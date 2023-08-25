import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Media} from './Media.js'
export default {
  title: 'cms/Media',
  component: Media,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Media>

type ComponentProps = React.ComponentProps<typeof Media>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Media {...args} />

export const Page: Story<ComponentProps> = Template.bind({})

Page.args = {}
