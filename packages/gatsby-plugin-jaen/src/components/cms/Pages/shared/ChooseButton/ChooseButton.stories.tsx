import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {ChooseButton} from './ChooseButton.js'
export default {
  title: 'Components/ChooseButton',
  component: ChooseButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ChooseButton>

type ComponentProps = React.ComponentProps<typeof ChooseButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => <ChooseButton {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
