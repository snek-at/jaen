import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FiBox, FiFileText, FiImage} from 'react-icons/fi'
import {SectionBlockSelectorButton} from './SectionBlockSelectorButton.js'
export default {
  title: 'Organisms/SectionBlockSelectorButton',
  component: SectionBlockSelectorButton,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SectionBlockSelectorButton>

type ComponentProps = React.ComponentProps<typeof SectionBlockSelectorButton>

// Create a template for the component
const Template: Story<ComponentProps> = args => (
  <SectionBlockSelectorButton {...args} />
)

const BLOCK_TYPES = [
  {
    slug: 'text',
    label: 'Text',
    Icon: FiFileText
  },
  {
    slug: 'image',
    label: 'Image',
    Icon: FiImage
  },
  {
    slug: 'threecard',
    label: 'Three Card',
    Icon: FiBox
  }
]

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  blocks: BLOCK_TYPES,
  onBlockAdd: () => {}
}
