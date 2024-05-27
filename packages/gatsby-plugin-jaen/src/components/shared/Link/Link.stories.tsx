import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {Link} from './Link'
export default {
  title: 'shared/Link',
  component: Link,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Link>

type ComponentProps = React.ComponentProps<typeof Link>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Link {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
