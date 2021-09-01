import SnekFinder from '@snek-at/snek-finder'
import IPFSBackend from '@snek-at/snek-finder/lib/backends/IPFSBackend'
import {Story, Meta} from '@storybook/react'

import TabsMain, {TabsMainProps} from '.'
import {Primary as PageExplorer} from '../../PageExplorer/PageExplorer.stories'
import {Primary as Settings} from '../../Settings/Settings.stories'

// import {Primary as Analytics} from '../../Analytics/Analytics.stories'

export default {
  title: 'Organisms/main/Tabs',
  component: TabsMain,
  subcomponents: {PageExplorer}
} as Meta

IPFSBackend.initBackendLink =
  'https://cloudflare-ipfs.com/ipfs/QmSw2QEGRx9PzBXsxt5HoKiong1hkWYN8pNwLKqwNPgaiR'
IPFSBackend.onBackendLinkChange = (link: string) => null

const Template: Story<TabsMainProps> = args => <TabsMain {...args} />

export const Primary = Template.bind({})

Primary.args = {
  start: [
    {label: 'Pages', content: <PageExplorer {...(PageExplorer.args as any)} />},
    {
      label: 'Files',
      content: <SnekFinder backend={IPFSBackend} mode="browser" />
    }
  ],
  end: [
    // {
    //   label: 'Analytics',
    //   content: <Analytics />
    // },
    {
      label: 'Settings',
      content: <Settings {...(Settings.args as any)} />
    }
  ]
}
