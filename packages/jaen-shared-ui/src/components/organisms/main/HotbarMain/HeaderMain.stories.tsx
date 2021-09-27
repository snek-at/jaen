import {Story, Meta} from '@storybook/react'

import HotbarMain, {HotbarMainProps} from '.'
import {
  EditButton,
  DiscardButton,
  PublishButton
} from '../../../molecules/buttons'

export default {
  title: 'Organisms/main/Hotbar',
  component: HotbarMain
} as Meta

const Template: Story<HotbarMainProps> = args => <HotbarMain {...args} />

export const Primary = Template.bind({})

Primary.args = {
  start: [
    <EditButton isEditing={false} onEditChange={(editing: boolean) => null} />,
    <DiscardButton onDiscardClick={() => null} />
  ],
  end: [<PublishButton onPublishClick={() => null} />]
}
