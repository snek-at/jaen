import loadable from '@loadable/component'

import {storageGet, usePages, useSiteMetadata} from './src/contexts/cms'
import {store} from './src/store'
import {JaenPagesEntity, JaenPagesPublish} from './src/types'
import {resolvePath} from './src/utils'

const DiscardButton = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/hotbar/DiscardButton'
    )
)
const EditButton = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/hotbar/EditButton'
    )
)
const PublishButton = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/hotbar/PublishButton'
    )
)

const FilesTab = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/tabs/FilesTab'
    )
)
const PagesTab = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/tabs/PagesTab'
    )
)
const SettingsTab = loadable(
  () =>
    import(
      /* webpackChunkName: "jaenuichunk" */ './src/containers/ui/tabs/SettingsTab'
    )
)

export default {
  name: 'jaen-pages',
  registerUI: {
    hotbar: {
      start: [<EditButton />, <DiscardButton />],
      end: [<PublishButton />]
    },
    tabs: {
      start: [
        {
          label: 'Pages',
          content: <PagesTab />
        },
        {
          label: 'Files',
          content: <FilesTab />
        }
      ],
      end: [
        {
          label: 'Settings',
          content: <SettingsTab />
        }
      ]
    }
  },
  registerCallbacks: {
    onPublish: async () => {
      const {upload} = await import('./src/storage')

      const {allSitePage} = storageGet()

      const allNodes = allSitePage.nodes

      const state = store.getState()

      const createdAt = new Date().toISOString()

      const newPages: {[id: string]: JaenPagesEntity} = {}

      // upload nodes to ipfs
      const nodes = state.site.allSitePage?.nodes

      if (nodes) {
        for (const [id, node] of Object.entries(nodes)) {
          const path = resolvePath(id, allNodes as any)
          const paylaod = {...node, path}

          const url = await upload(paylaod)
          newPages[id] = {context: {fileUrl: url, createdAt}}
        }
      }

      const siteMetadataPayload = state.site.siteMetadata

      const newSiteMetadata = siteMetadataPayload
        ? await upload(siteMetadataPayload)
        : undefined

      const publishData: JaenPagesPublish = {
        site: newSiteMetadata
          ? {
              context: {
                createdAt,
                fileUrl: newSiteMetadata
              }
            }
          : undefined,
        snekFinder: state.sf.initBackendLink
          ? {
              context: {
                createdAt,
                fileUrl: state.sf.initBackendLink
              }
            }
          : undefined,
        pages: newPages
      }

      return publishData
    }
  }
}
