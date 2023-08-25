import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Footer} from './Footer.js'
export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Footer>

type ComponentProps = React.ComponentProps<typeof Footer>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Footer {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
