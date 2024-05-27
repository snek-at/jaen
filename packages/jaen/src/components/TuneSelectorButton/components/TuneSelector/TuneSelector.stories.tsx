import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {TuneSelector} from './TuneSelector.js'
export default {
  title: 'Components/TuneSelector',
  component: TuneSelector,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof TuneSelector>

type ComponentProps = React.ComponentProps<typeof TuneSelector>

// Create a template for the component
const Template: Story<ComponentProps> = args => <TuneSelector {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
