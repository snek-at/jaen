import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {TuneSelectorButton} from './TuneSelectorButton.js'
export default {
  title: 'Components/TuneSelectorButton',
  component: TuneSelectorButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof TuneSelectorButton>

type ComponentProps = React.ComponentProps<typeof TuneSelectorButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => <TuneSelectorButton {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
