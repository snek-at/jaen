import {Box, Heading} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {withJaenMock} from '../../internal/testing/withJaenMock.js'
import {Field} from '../index.js'
import {IndexField} from './IndexField.js'

const JaenPage = {
  id: `JaenPage jaen-page-2`,
  slug: 'jaen-page-1',
  parentPage: null,
  children: [
    {
      id: `JaenPage jaen-page-3`,
      slug: 'jaen-page-3'
    }
  ],
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
      'rich-text-field-1': {
        value: '<p>this is a stored rtf value</p>'
      }
    }
  },
  chapters: {},
  template: 'BlogPage',
  jaenFiles: []
}

export default {
  title: 'fields/IndexField',
  component: IndexField,
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
          children: [JaenPage],
          jaenPageMetadata: {
            title: 'Jaen Page 1',
            description: 'Jaen Page 1 description',
            image: 'https://via.placeholder.com/300x200',
            canonical: 'https://jaen.com/jaen-page-1',
            publishedAt: '2020-01-01',
            isBlogPost: false
          },
          sections: [],
          jaenFields: null,
          template: 'BlogPage',
          jaenFiles: []
        },
        jaenPages: [JaenPage]
      })

      return <Mocked />
    }
  ]
} as ComponentMeta<typeof IndexField>

type ComponentProps = React.ComponentProps<typeof IndexField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <IndexField {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
Basic.args = {
  renderPage: page => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading>{page.id}</Heading>
      <Heading as="h2">{page.slug}</Heading>
      <Field.Text name="rich-text-field-1" defaultValue="<p>richtext2<p>" rtf />
    </Box>
  )
}

export const CustomId: Story<ComponentProps> = Template.bind({})
CustomId.args = {
  jaenPageId: 'JaenPage jaen-page-2',
  renderPage: page => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading>{page.id}</Heading>
      <Heading as="h2">{page.slug}</Heading>
      <Field.Text name="rich-text-field-1" defaultValue="<p>richtext2<p>" rtf />
    </Box>
  )
}
