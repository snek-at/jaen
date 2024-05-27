import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Breadcrumbs} from './Breadcrumbs'
export default {
  title: 'JaenFrame/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Breadcrumbs>

type ComponentProps = React.ComponentProps<typeof Breadcrumbs>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Breadcrumbs {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  links: [
    {
      label: 'Pages',
      onClick: () => {},
      path: '/pages'
    },
    {
      label: 'Page 1',
      onClick: () => {},
      path: '/pages/page1'
    }
  ]
}
