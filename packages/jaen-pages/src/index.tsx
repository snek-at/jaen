import loadable from '@loadable/component'

import DiscardButton from './containers/ui/hotbar/DiscardButton'
import EditButton from './containers/ui/hotbar/EditButton'
import PublishButton from './containers/ui/hotbar/PublishButton'
import {upload} from './ipfs'
import {store} from './store'
import {JaenPagesEntity, JaenPagesPublish} from './types'

export type {JaenTemplate, JaenBlock} from './types'

export {withRedux} from './store/withRedux'
export {useOptions} from './store/hooks'

export {default as BlockContainer} from './containers/blocks/Container'

export * as fields from './containers/fields'

const PagesTab = loadable(() => import('./containers/ui/tabs/PagesTab'))
const FilesTab = loadable(() => import('./containers/ui/tabs/FilesTab'))
const SettingsTab = loadable(() => import('./containers/ui/tabs/SettingsTab'))

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
