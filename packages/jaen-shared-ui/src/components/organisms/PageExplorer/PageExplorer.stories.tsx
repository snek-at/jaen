import {Story, Meta} from '@storybook/react'

import PageExplorer, {PageExplorerProps} from '.'

export default {
  title: 'Organisms/PageExplorer',
  component: PageExplorer
} as Meta

const Template: Story<PageExplorerProps> = args => <PageExplorer {...args} />

export const Primary = Template.bind({})

Primary.args = {
  rootItemIds: ['1', '2'],
  items: {
    '1': {
      children: [],
      data: {
        title: 'Snek Homepage 1',
        slug: 'string',
        image: 'string',
        isBlogPost: false,
        lastPublished: 'string',
        locked: true
      },
      parent: null
    },
    '2': {
      children: ['2-1'],
      data: {
        title: 'My Blog 2',
        slug: 'my-blog',
        description: 'A fancy blog',
        image: 'string',
        isBlogPost: false,
        lastPublished: 'string'
      },
      parent: null
    },
    '2-1': {
      children: ['2-1-1'],
      data: {
        title: 'JaenV2 2-1',
        slug: 'jaen-v2',
        description: 'Wow.. Jaen release out now!',
        image: 'string',
        isBlogPost: true,
        lastPublished: '21.08.2021'
      },
      parent: '2'
    },
    '2-1-1': {
      children: ['2-1-1-1'],
      data: {
        title: 'JaenV3 2-1-1',
        slug: 'jaen-v2',
        description: 'Wow.. Jaen release out now!',
        image: 'string',
        isBlogPost: true,
        lastPublished: '21.08.2021'
      },
      parent: '2-1'
    },
    '2-1-1-1': {
      children: [],
      data: {
        title: 'JaenV3 2-1-1-1',
        slug: 'jaen-v2',
        description: 'Wow.. Jaen release out now!',
        image: 'string',
        isBlogPost: true,
        lastPublished: '21.08.2021'
      },
      parent: '2-1-1'
    }
  },
  defaultSelection: '1',
  templates: ['HomePage'],
  onItemCreate: (parentId, name) => null,
  onItemDelete: () => {},
  onItemUpdate: () => {},
  onItemMove: () => null
}
