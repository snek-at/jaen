import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {[FTName]} from './[FTName].js'
export default {
  title: 'Components/[FTName]',
  component: [FTName],
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof [FTName]>

type ComponentProps = React.ComponentProps<typeof [FTName]>

// Create a template for the component
const Template: Story<ComponentProps> = args => <[FTName] {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
