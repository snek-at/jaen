import {ChevronLeftIcon, ChevronRightIcon, EditIcon} from '@chakra-ui/icons'
import {Select} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {HighlightTooltip} from './HighlightTooltip.js'
export default {
  title: 'atoms/HighlightTooltip',
  component: HighlightTooltip,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof HighlightTooltip>

type ComponentProps = React.ComponentProps<typeof HighlightTooltip>

// Create a template for the component
const Template: Story<ComponentProps> = args => <HighlightTooltip {...args} />

export const TextField: Story<ComponentProps> = Template.bind({})

TextField.args = {
  children: (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'red'
      }}
    />
  ),
  actions: ['Text']
}

export const ImageField: Story<ComponentProps> = Template.bind({})

ImageField.args = {
  children: (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'red'
      }}
    />
  ),
  actions: ['Image', <EditIcon key="edit" />]
}

export const SectionField: Story<ComponentProps> = Template.bind({})

SectionField.args = {
  children: (
    <div
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'red'
      }}
    />
  ),
  actions: [
    'Section',
    <>
      <ChevronLeftIcon
        onClick={() => {
          alert('left')
        }}
        cursor="pointer"
      />

      <Select pos="relative" size="xs">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>

      <ChevronRightIcon
        onClick={() => {
          alert('right')
        }}
        cursor="pointer"
      />
    </>
  ]
}
