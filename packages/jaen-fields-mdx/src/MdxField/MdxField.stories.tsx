import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {withJaenMock} from '../../internal/testing/withJaenMock.js'
import {MdxField} from './MdxField'
export default {
  title: 'fields/MdxField',
  component: MdxField,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => {
      const Mocked = withJaenMock(Story, {
        jaenPage: {
          id: `JaenPage jaen-page-1`,
          slug: 'jaen-page-1',
          parent: null,
          children: [],
          jaenPageMetadata: {
            title: 'Jaen Page 1',
            description: 'Jaen Page 1 description',
            image: 'https://via.placeholder.com/300x200',
            canonical: 'https://jaen.com/jaen-page-1',
            datePublished: '2020-01-01',
            isBlogPost: false
          },
          jaenFields: {
            'IMA:MdxField': {
              'mdx-field-1': {
                value: {
                  raw: `# Hello, world!
                  
This is a message from jaen mock.`
                }
              }
            }
          },
          chapters: {},
          template: 'BlogPage',
          jaenFiles: []
        }
      })

      return <Mocked />
    }
  ]
} as ComponentMeta<typeof MdxField>

type ComponentProps = React.ComponentProps<typeof MdxField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <MdxField {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  name: 'mdx-field-1'
}
