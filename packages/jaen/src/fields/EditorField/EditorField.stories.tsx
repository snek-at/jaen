import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {EditorField} from './EditorField.js'
export default {
  title: 'Components/EditorField',
  component: EditorField,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof EditorField>

type ComponentProps = React.ComponentProps<typeof EditorField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <EditorField {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
