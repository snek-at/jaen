import {Story, Meta} from '@storybook/react'

import PageContent, {PageContentType} from '.'

export default {
  title: 'Organisms/PageContent',
  component: PageContent
} as Meta

const Template: Story = args => (
  <PageContent
    onValuesChange={_values => null}
    {...args}
    onImageClick={() => null}
  />
)

export const Primary: Story<PageContentType> = Template.bind({})

Primary.args = {
  values: {
    title: 'Snek Homepage',
    slug: 'a-slug',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    image: 'https://placehold.jp/150x150.png',
    isBlogPost: false,
    lastPublished: 'never'
  }
}
