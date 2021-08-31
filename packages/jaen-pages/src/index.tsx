import loadable from '@loadable/component'
import ipfsClient from 'ipfs-http-client'

import DiscardButton from './containers/ui/hotbar/DiscardButton'
import EditButton from './containers/ui/hotbar/EditButton'
import PublishButton from './containers/ui/hotbar/PublishButton'
import {store} from './store'

export * as fields from './containers/fields'
export * as blocks from './containers/blocks'

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

      const ipfs = ipfsClient.create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https'
      })

      const upload = async (payload: any) => {
        const {cid} = await ipfs.add(payload)
        return `https://ipfs.io/ipfs/${cid.toString()}`
      }

      const pageUrls: string[] = []

      // upload nodes to ipfs
      const nodes = state.site.allSitePage?.nodes

      if (nodes) {
        for (const [id, node] of Object.entries(nodes)) {
          const paylaod = JSON.stringify({id, page: node})

          // const res = await ipfs.add(paylaod)
          // const url = `https://ipfs.io/ipfs/${res.cid.toString()}`

          const url = await upload(paylaod)
          pageUrls.push(url)
        }
      }

      const siteMetadataPayload = JSON.stringify(state.site.siteMetadata)

      // const siteMetadata =
      //   ? await upload(JSON.stringify(state.site.siteMetadata))

      const siteMetadata = siteMetadataPayload
        ? await upload(siteMetadataPayload)
        : undefined

      return {
        pages: pageUrls,
        siteMetadata,
        snekFinder: state.sf
      }
    }
  }
}
