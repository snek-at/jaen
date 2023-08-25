import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {FaBook, FaCog, FaLifeRing, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {DrawerRight} from './DrawerRight'
export default {
  title: 'JaenFrame/DrawerRight',
  component: DrawerRight,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof DrawerRight>

type ComponentProps = React.ComponentProps<typeof DrawerRight>

// Create a template for the component
const Template: Story<ComponentProps> = args => <DrawerRight {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  user: {
    username: 'schettn',
    firstName: 'Jem',
    lastName: 'Calacar'
  },
  navigationGroups: {
    you: {
      items: {
        home: {
          icon: FaUser,
          label: 'Your Profile'
        }
      }
    },
    account: {
      items: {
        settings: {
          icon: FaCog,
          label: 'Settings'
        }
      }
    },
    help: {
      items: {
        support: {
          icon: FaLifeRing,
          label: 'Snek Support'
        },
        docs: {
          icon: FaBook,
          label: 'Snek Docs'
        }
      }
    },
    more: {
      items: {
        logout: {
          icon: FaSignOutAlt,
          label: 'Logout'
        }
      }
    }
  }
}
