import {Box, Wrap, WrapItem} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {connectBlock} from '../../connectors/connectBlock.js'
import {withJaenMock} from '../../internal/testing/withJaenMock.js'
import {ImageField} from '../ImageField/ImageField.js'
import {TextField} from '../TextField/TextField.js'
import {SectionField} from './SectionField.js'
export default {
  title: 'fields/SectionField',
  component: SectionField,
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
          jaenFields: null,
          jaenFiles: [],
          chapters: {
            'section-field-filled': {
              ptrHead: 'JaenSection foo-bar-baz-1',
              ptrTail: 'JaenSection foo-bar-baz-2',
              blocks: {
                'JaenSection foo-bar-baz-1': {
                  jaenFields: null,
                  name: 'BoxSection',
                  ptrNext: 'JaenSection foo-bar-baz-2',
                  ptrPrev: null // this is the first section of the chapter
                },
                'JaenSection foo-bar-baz-2': {
                  jaenFields: null,
                  name: 'BoxSection',
                  ptrNext: null, // this is the last section of the chapter
                  ptrPrev: 'JaenSection foo-bar-baz-1'
                }
              }
            }
          },
          template: 'BlogPage'
        }
      })

      return <Mocked />
    }
  ]
} as ComponentMeta<typeof SectionField>

type ComponentProps = React.ComponentProps<typeof SectionField>

// Create a template for the component
const Template: Story<ComponentProps> = args => <SectionField {...args} />

// #region > Sections
const BoxBlock = connectBlock(
  () => (
    <Box w="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      BoxSection
    </Box>
  ),
  {name: 'box', label: 'The Box'}
)

const FieldsBlock = connectBlock(
  () => (
    <Box w="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Box h="sm">
        <ImageField name="image" />
      </Box>
      <TextField name="tf" defaultValue="sample value" />
    </Box>
  ),
  {name: 'FieldsBlock', label: 'Block /w fields'}
)

const BlockWithIcon = connectBlock(
  () => (
    <Box w="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      BlockWithIcon
    </Box>
  ),
  {name: 'iconbox', label: 'The Box', Icon: () => <span>📦</span>}
)
// #endregion

export const NoBlocks: Story<ComponentProps> = Template.bind({})
NoBlocks.args = {
  name: 'section-field',
  label: 'Section Field',
  blocks: []
}

export const Empty: Story<ComponentProps> = Template.bind({})
Empty.args = {
  name: 'section-field',
  label: 'Section Field',
  blocks: [BoxBlock]
}

export const Filled: Story<ComponentProps> = Template.bind({})
Filled.args = {
  name: 'section-field-filled',
  label: 'Section Field',
  blocks: [BoxBlock]
}

export const WithFields: Story<ComponentProps> = Template.bind({})
WithFields.args = {
  name: 'section-field-filled',
  label: 'Section Field with inner fields',
  blocks: [FieldsBlock]
}

export const MultipleBlocks: Story<ComponentProps> = Template.bind({})
MultipleBlocks.args = {
  name: 'section-field-filled',
  label: 'Section Field with multiple sections',
  blocks: [BoxBlock, FieldsBlock, BlockWithIcon]
}

export const Styled: Story<ComponentProps> = Template.bind({})
Styled.args = {
  name: 'section-field-filled',
  label: 'Section Field with inner fields',
  blocks: [BoxBlock],
  style: {
    border: 'red 1px solid'
  },
  sectionStyle: {
    border: 'blue 1px solid',
    maxWidth: '100px'
  }
}

export const Wrapped: Story<ComponentProps> = Template.bind({})
Wrapped.args = {
  name: 'section-field-filled',
  label: 'Section Field with inner fields',
  blocks: [BoxBlock],
  as: Wrap,
  sectionAs: WrapItem,
  props: {
    justify: 'center'
  }
}
