import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {JaenLogout} from './JaenLogout'
export default {
  title: 'JaenLogout',
  component: JaenLogout,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof JaenLogout>

type ComponentProps = React.ComponentProps<typeof JaenLogout>

// Create a template for the component
const Template: Story<ComponentProps> = args => <JaenLogout {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  goBackPath: 'https://snek.at',
  onSignOut: () => {
    alert('Logged out')
  }
}
