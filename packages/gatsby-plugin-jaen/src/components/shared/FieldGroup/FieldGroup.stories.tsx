import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FieldGroup} from './FieldGroup'
export default {
  title: 'shared/FieldGroup',
  component: FieldGroup,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof FieldGroup>

type ComponentProps = React.ComponentProps<typeof FieldGroup>

// Create a template for the component
const Template: Story<ComponentProps> = args => <FieldGroup {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
