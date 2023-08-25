import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {JaenFrameActivationButton} from './JaenFrameActivationButton'
export default {
  title: 'JaenFrameActivationButton',
  component: JaenFrameActivationButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof JaenFrameActivationButton>

type ComponentProps = React.ComponentProps<typeof JaenFrameActivationButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => (
  <JaenFrameActivationButton {...args} />
)

export const Basic: Story<ComponentProps> = Template.bind({})
