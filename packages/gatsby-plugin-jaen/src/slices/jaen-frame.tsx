import {
  PageConfig,
  useAuth,
  useJaenUpdateModalContext,
  useMediaModal,
  useNotificationsContext,
  checkUserRoles
} from '@atsnek/jaen'
import {graphql, SliceComponentProps} from 'gatsby'
import {useEffect, useState} from 'react'

import {FaEdit} from '@react-icons/all-files/fa/FaEdit'
import {FaFileDownload} from '@react-icons/all-files/fa/FaFileDownload'
import {FaFileUpload} from '@react-icons/all-files/fa/FaFileUpload'
import {FaGlobe} from '@react-icons/all-files/fa/FaGlobe'
import {FaImage} from '@react-icons/all-files/fa/FaImage'
import {FaSitemap} from '@react-icons/all-files/fa/FaSitemap'
import {FaTrash} from '@react-icons/all-files/fa/FaTrash'

import {useJaenFrameMenuContext} from '../contexts/jaen-frame-menu'
import JaenFrame from '../components/JaenFrame/JaenFrame'
import Logo from '../components/Logo'
import {CMSManagement, useCMSManagement} from '../connectors/cms-management'
import {usePageConfig} from './page-config-parser'

type SliceProps = SliceComponentProps<
  {
    allSitePage: {
      nodes: Array<{
        id: string
        path: string
        pageContext: {
          pageConfig: PageConfig
        }
      }>
    }
  },
  {},
  {
    jaenPageId: string
    pageConfig: any
  }
>

const Slice: React.FC<SliceProps> = props => {
  const manager = useCMSManagement()

  const auth = useAuth()
  const mediaModal = useMediaModal()

  const {toast} = useNotificationsContext()

  const jaenUpdate = useJaenUpdateModalContext()

  const isBadgeVisible = manager.isEditing || jaenUpdate.isUpdateAvailable

  const {menu, extendMenu, addMenu, extendAddMenu} = useJaenFrameMenuContext()

  const {parsePageConfig} = usePageConfig()

  const [pageConfig, setPageConfig] = useState<PageConfig>()

  useEffect(() => {
    if (props.pageConfig) {
      parsePageConfig(props.pageConfig).then(config => {
        setPageConfig(config)
      })
    }
  }, [props.pageConfig])

  useEffect(() => {
    const isJaenAdmin = checkUserRoles(auth.user, ['jaen:admin'])

    if (isJaenAdmin) {
      extendMenu('user', {
        group: 'add',
        items: {
          addPage: {
            label: 'New page',
            icon: FaSitemap,
            path: `/cms/pages/new/#${btoa(props.jaenPageId)}`
          },
          addMedia: {
            label: 'New media',
            icon: FaImage,
            onClick: () => {
              mediaModal.toggleModal()
            }
          }
        }
      })

      // Add jaenCMS user menu
      extendMenu('user', {
        group: 'jaenCMS',
        label: 'Jaen CMS',
        items: {
          edit: {
            label: manager.isEditing ? 'Stop editing' : 'Start editing',
            icon: FaEdit,
            onClick: () => {
              manager.setIsEditing(!manager.isEditing)

              toast({
                title: 'Edit mode',
                description: !manager.isEditing
                  ? 'You can now edit the page'
                  : 'You can no longer edit the page',
                status: !manager.isEditing ? 'success' : 'info'
              })
            }
          },
          save: {
            label: 'Save draft',
            icon: FaFileDownload,
            onClick: () => {
              manager.draft.save()

              toast({
                title: 'Saved',
                description: 'Your changes have been saved',
                status: 'success'
              })
            }
          },
          import: {
            label: 'Import draft',
            icon: FaFileUpload,
            onClick: async () => {
              try {
                await manager.draft.import()

                toast({
                  title: 'Imported',
                  description: 'Your changes have been imported',
                  status: 'success'
                })
              } catch (e) {
                toast({
                  title: 'Failed to import',
                  description: 'Your changes could not be imported',
                  status: 'error'
                })
              }
            }
          },
          discard: {
            label: 'Discard changes',
            icon: FaTrash,
            onClick: () => {
              manager.draft.discard()

              toast({
                title: 'Discarded',
                description: 'Your changes have been discarded',
                status: 'info'
              })
            }
          },
          publish: {
            label: `Publish ${
              manager.isPublishing ? 'in progress' : 'changes'
            }`,
            isLoading: manager.isPublishing,
            icon: FaGlobe,
            onClick: async () => {
              manager.draft.publish()
            }
          }
        }
      })

      // Add jaenCMS add menu
      extendAddMenu({
        addPage: {
          label: 'New page',
          icon: FaSitemap,
          path: props.jaenPageId
            ? `/cms/pages/new/#${btoa(props.jaenPageId)}`
            : '/cms/pages/new/'
        },
        addMedia: {
          label: 'New media',
          icon: FaImage,
          onClick: () => {
            mediaModal.toggleModal()
          }
        }
      })
    }

    const sortedNodes = props.data.allSitePage.nodes.sort((a, b) => {
      const aOrder = a.pageContext.pageConfig?.menu?.order || 0
      const bOrder = b.pageContext.pageConfig?.menu?.order || 0
      return aOrder - bOrder
    })

    sortedNodes.forEach(async node => {
      const config = await parsePageConfig(node.pageContext.pageConfig)

      if (!config?.menu) return

      if (config.auth?.isAdminRequired && !isJaenAdmin) return

      // Make sure at least one role of config.auth?.roles is in authentication.user?.roles
      const configRoles = config.auth?.roles || []

      if (configRoles.length > 0) {
        if (!checkUserRoles(auth.user, configRoles)) return
      }

      const group = config.menu.group || 'default'

      const groupType = config.menu.type === 'app' ? 'app' : 'user'

      const icon = config.icon
        ? (await import(`@react-icons/all-files/fa/${config.icon}`))[
            config.icon
          ]
        : undefined

      extendMenu(groupType, {
        group,
        label: config.menu.groupLabel,
        items: {
          [node.id]: {
            label: config.menu?.label?.toString() || config.label,
            path: config.menu?.path?.toString() || node.path,
            icon
          }
        }
      })
    })
  }, [auth.user, props.data.allSitePage.nodes, manager.isEditing])

  return (
    <JaenFrame
      navigation={{
        isStickyDisabled: pageConfig?.withoutJaenFrameStickyHeader,
        app: {
          navigationGroups: menu.app,
          // @ts-ignore
          version: __VERSION__,
          logo: <Logo />
        },
        user: {
          user: auth.user
            ? {
                username:
                  auth.user.profile.preferred_username?.replace(
                    `@${auth.user.profile['urn:zitadel:iam:user:resourceowner:primary_domain']}`,
                    ''
                  ) || auth.user.profile.sub,
                firstName: auth.user?.profile?.given_name,
                lastName: auth.user?.profile?.family_name,
                avatarURL: auth.user?.profile?.picture
              }
            : {
                username: 'Guest'
              },
          navigationGroups: menu.user,
          isBadgeVisible
        },
        addMenu,
        breadcrumbs: {
          links: (pageConfig?.breadcrumbs as any) || []
        }
      }}
      logo={<Logo />}
    />
  )
}

const JaenFrameSlice: React.FC<SliceProps> = props => {
  const auth = useAuth()

  const isJaenAdmin = checkUserRoles(auth.user, ['jaen:admin'])

  if (isJaenAdmin) {
    return (
      <CMSManagement>
        <Slice {...props} />
      </CMSManagement>
    )
  }

  return <Slice {...props} />
}

export default JaenFrameSlice

export const query = graphql`
  query {
    allSitePage {
      nodes {
        id
        path
        pageContext
      }
    }
  }
`
