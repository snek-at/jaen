import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {PageTree} from './PageTree.js'
export default {
  title: 'shared/PageTree',
  component: PageTree,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PageTree>

type ComponentProps = React.ComponentProps<typeof PageTree>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PageTree {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  nodes: [
    {
      path: '/',
      title: 'Home'
    },
    {
      path: '/blog/',
      title: 'Blog'
    },
    {
      path: '/blog/first-post/',
      title: 'First Post'
    },
    {
      path: '/blog/second-post/',
      title: 'Second Post'
    },
    {
      path: '/blog/third-post/',
      title: 'Third Post'
    },
    {
      path: '/about/',
      title: 'About',
      isLocked: true
    },
    {
      path: '/contact/',
      title: 'Contact'
    }
  ]
}
