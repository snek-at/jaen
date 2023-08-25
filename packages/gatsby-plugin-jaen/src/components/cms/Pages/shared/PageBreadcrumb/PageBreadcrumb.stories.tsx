import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PageBreadcrumb} from './PageBreadcrumb.js'
export default {
  title: 'Components/PageBreadcrumb',
  component: PageBreadcrumb,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PageBreadcrumb>

type ComponentProps = React.ComponentProps<typeof PageBreadcrumb>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PageBreadcrumb {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
