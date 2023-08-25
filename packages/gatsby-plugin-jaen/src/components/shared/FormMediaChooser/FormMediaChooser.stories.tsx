import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FormMediaChooser} from './FormMediaChooser.js'
export default {
  title: 'Components/FormMediaChooser',
  component: FormMediaChooser,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof FormMediaChooser>

type ComponentProps = React.ComponentProps<typeof FormMediaChooser>

// Create a template for the component
const Template: Story<ComponentProps> = args => <FormMediaChooser {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
