import {Story, Meta} from '@storybook/react'

import CreatePageModal, {CreatePageModalProps} from '.'

export default {
  title: 'Molecules/modals/CreatePageModal',
  component: CreatePageModal
} as Meta

const Template: Story<CreatePageModalProps> = args => (
  <CreatePageModal {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  isOpen: true,
  templates: ['HomePage', 'BlogPage', 'BlogPost'],
  onClose: () => {},
  onCreate: () => {},
  onValidate: (name: string) => {
    const trimmed = name.trim()

    if (!trimmed || ['home'].includes(trimmed)) {
      return false
    }

    return true
  }
}
