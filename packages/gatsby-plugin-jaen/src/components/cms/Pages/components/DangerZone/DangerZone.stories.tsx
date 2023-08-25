import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {DangerZone} from './DangerZone.js'
export default {
  title: 'Components/DangerZone',
  component: DangerZone,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof DangerZone>

type ComponentProps = React.ComponentProps<typeof DangerZone>

// Create a template for the component
const Template: Story<ComponentProps> = args => <DangerZone {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
