import DiscardButton from './src/containers/ui/hotbar/DiscardButton'
import EditButton from './src/containers/ui/hotbar/EditButton'
import PublishButton from './src/containers/ui/hotbar/PublishButton'
import FilesTab from './src/containers/ui/tabs/FilesTab'
import PagesTab from './src/containers/ui/tabs/PagesTab'
import SettingsTab from './src/containers/ui/tabs/SettingsTab'
import {upload} from './src/ipfs'
import {store} from './src/store'
import {JaenPagesEntity, JaenPagesPublish} from './src/types'

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
      const state = store.getState()

      const createdAt = new Date().toISOString()

      const newPages: {[id: string]: JaenPagesEntity} = {}

      // upload nodes to ipfs
      const nodes = state.site.allSitePage?.nodes

      if (nodes) {
        for (const [id, node] of Object.entries(nodes)) {
          const paylaod = JSON.stringify(node)

          const url = await upload(paylaod)
          newPages[id] = {context: {fileUrl: url, createdAt}}
        }
      }

      const siteMetadataPayload = JSON.stringify(state.site.siteMetadata)

      const siteMetadata = siteMetadataPayload
        ? await upload(siteMetadataPayload)
        : undefined

      const publishData: JaenPagesPublish = {
        site: siteMetadata
          ? {
              context: {
                createdAt,
                fileUrl: siteMetadata
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
