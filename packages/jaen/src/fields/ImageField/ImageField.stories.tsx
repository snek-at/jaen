import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {ImageField} from './ImageField.js'
export default {
  title: 'Components/ImageField',
  component: ImageField,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ImageField>

type ComponentProps = React.ComponentProps<typeof ImageField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <ImageField {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
