import {Story, Meta} from '@storybook/react'

import Settings, {SettingsProps} from '.'

export default {
  title: 'Organisms/Settings',
  component: Settings
} as Meta

const Template: Story<SettingsProps> = args => <Settings {...args} />

export const Primary = Template.bind({})

Primary.args = {
  values: {
    title: 'Snek Homepage',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    siteUrl: 'https://snek.at',
    image: 'https://placehold.jp/150x150.png',
    author: {
      name: 'A verypassionateguy'
    },
    organization: {
      name: 'snek-at',
      url: 'snek.at',
      logo: 'idk'
    },
    social: {
      twitter: '@verypassionateguy', // twitter username
      fbAppID: 'cool', // FB ANALYTICS
      google: 'st ring' // GOOGLE ANALYTICS
    },
    lastPublished: 'never'
  },
  onValuesChange: () => {},
  onImageClick: () => {}
}
