import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PageContentForm} from './PageContentForm.js'
export default {
  title: 'Components/PageContentForm',
  component: PageContentForm,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PageContentForm>

type ComponentProps = React.ComponentProps<typeof PageContentForm>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PageContentForm {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  templates: {
    BlogTemplate: {
      label: 'Blog'
    }
  },
  parentPages: {
    BlogIndex: {
      label: 'The Blog'
    }
  }
}
