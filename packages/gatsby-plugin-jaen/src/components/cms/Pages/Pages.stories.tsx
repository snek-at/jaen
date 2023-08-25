import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Pages} from './Pages.js'
export default {
  title: 'cms/Pages',
  component: Pages,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Pages>

type ComponentProps = React.ComponentProps<typeof Pages>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Pages {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  pageId: 'JaenPage /',
  form: {},
  children: [
    {
      title: 'Home',
      description:
        'Discover the latest fashion trends and shop for stylish clothing, accessories, and footwear. Stay ahead of the fashion curve with our curated collection.',
      childPages: 0,
      author: 'John Doe',
      publishedDate: '2023-07-01T12:00:00Z',
      lastModifiedDate: '2023-07-01T12:00:00Z',
      imageSrc:
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Content',
      description:
        'Explore our web development, mobile development, design, and marketing services.',
      childPages: 4,
      author: 'Jane Smith',
      publishedDate: '2023-07-05T09:30:00Z',
      lastModifiedDate: '2023-07-05T09:30:00Z',
      imageSrc:
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Grosshandel',
      description: 'Read our latest blog posts on various topics.',
      childPages: 0,
      publishedDate: '2023-07-10T15:45:00Z',
      imageSrc:
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Wissen',
      description: 'Get answers to frequently asked questions.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z',
      lastModifiedDate: '2023-07-15T10:20:00Z',
      imageSrc:
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'FAQ',
      description: 'Get answers to frequently asked questions.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z',
      lastModifiedDate: '2023-07-15T10:20:00Z',
      imageSrc:
        'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      title: '404',
      description: 'Page not found.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z',
      lastModifiedDate: '2023-07-15T10:20:00Z'
    },
    {
      title: 'Impressum',
      description: 'Legal notice.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z',
      lastModifiedDate: '2023-07-15T10:20:00Z'
    },
    {
      title: 'Datenschutz',
      description: 'Data protection policy.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z'
    },
    {
      title: 'AGB',
      description: 'Terms and conditions.',
      childPages: 0,
      publishedDate: '2023-07-15T10:20:00Z'
    }
    // Add more pages as needed
  ],
  tree: [
    {
      id: 'JaenPage /',
      label: 'Home',
      children: [
        {
          id: 'JaenPage /content/',
          label: 'Content',
          children: [
            {
              id: 'JaenPage /content/grosshandel/',
              label: 'Grosshandel',
              children: []
            },
            {
              id: 'JaenPage /content/wissen/',
              label: 'Wissen',
              children: []
            },
            {
              id: 'JaenPage /content/faq/',
              label: 'FAQ',
              children: []
            }
          ]
        }
      ]
    }
  ]
}
