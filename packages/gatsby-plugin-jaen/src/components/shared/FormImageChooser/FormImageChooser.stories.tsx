import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FormImageChooser} from './FormImageChooser.js'
export default {
  title: 'Components/FormImageChooser',
  component: FormImageChooser,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof FormImageChooser>

type ComponentProps = React.ComponentProps<typeof FormImageChooser>

// Create a template for the component
const Template: Story<ComponentProps> = args => <FormImageChooser {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
