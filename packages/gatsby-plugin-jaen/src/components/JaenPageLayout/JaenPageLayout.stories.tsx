import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {JaenPageLayout} from './JaenPageLayout.js'
export default {
  title: 'Components/JaenPageLayout',
  component: JaenPageLayout,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof JaenPageLayout>

type ComponentProps = React.ComponentProps<typeof JaenPageLayout>

// Create a template for the component
const Template: Story<ComponentProps> = args => <JaenPageLayout {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
