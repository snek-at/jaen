import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FiBox, FiFileText, FiImage} from 'react-icons/fi'

import {SectionBlockSelector} from './SectionBlockSelector.js'
export default {
  title: 'Molecules/SectionBlockSelector',
  component: SectionBlockSelector,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SectionBlockSelector>

type ComponentProps = React.ComponentProps<typeof SectionBlockSelector>

// Create a template for the component
const Template: Story<ComponentProps> = args => (
  <SectionBlockSelector {...args} />
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
  sectionTitle: 'Block Types',
  sectionDescription: 'Select the type of block you want to add',
  blockTypes: BLOCK_TYPES,
  onBlockAdd: () => {}
}
