import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {withJaenMock} from '../../internal/testing/withJaenMock.js'
import {TextField} from './TextField.js'
export default {
  title: 'fields/TextField',
  component: TextField,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    Story => {
      const Mocked = withJaenMock(Story, {
        jaenPage: {
          id: `JaenPage jaen-page-1`,
          slug: 'jaen-page-1',
          parentPage: null,
          children: [],
          jaenPageMetadata: {
            title: 'Jaen Page 1',
            description: 'Jaen Page 1 description',
            image: 'https://via.placeholder.com/300x200',
            canonical: 'https://jaen.com/jaen-page-1',
            publishedAt: '2020-01-01',
            isBlogPost: false
          },
          jaenFields: {
            'IMA:TextField': {
              'text-field-1': {
                value: 'This is a text field'
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
} as ComponentMeta<typeof TextField>

type ComponentProps = React.ComponentProps<typeof TextField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <TextField {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  name: 'text-field-1',
  defaultValue: 'This is a text field'
}
