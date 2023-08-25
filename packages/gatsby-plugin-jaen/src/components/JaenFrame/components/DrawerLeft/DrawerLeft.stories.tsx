import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {
  FaCog,
  FaHome,
  FaImage,
  FaPencilAlt,
  FaSitemap,
  FaUsersCog
} from 'react-icons/fa'
import {DrawerLeft} from './DrawerLeft'
export default {
  title: 'JaenFrame/DrawerLeft',
  component: DrawerLeft,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof DrawerLeft>

type ComponentProps = React.ComponentProps<typeof DrawerLeft>

// Create a template for the component
const Template: Story<ComponentProps> = args => <DrawerLeft {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  navigationGroups: {
    you: {
      items: {
        home: {
          icon: FaHome,
          label: 'Home'
        }
      }
    },
    cms: {
      label: 'Jaen CMS',
      items: {
        pages: {
          icon: FaSitemap,
          label: 'Pages',
          onClick: () => {
            console.log('pages')
          }
        },
        media: {
          icon: FaImage,
          label: 'Media',
          onClick: () => {
            console.log('media')
          }
        },
        settings: {
          icon: FaCog,
          label: 'Settings',
          onClick: () => {
            console.log('settings')
          }
        }
      }
    },
    photonq: {
      label: 'PhotonQ',
      items: {
        posts: {
          icon: FaPencilAlt,
          label: 'Posts',
          onClick: () => {
            console.log('posts')
          }
        },
        users: {
          icon: FaUsersCog,
          label: 'Users',
          onClick: () => {
            console.log('users')
          }
        }
      }
    }
  },
  version: '0.0.1'
}
