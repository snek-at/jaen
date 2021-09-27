import loadable from '@loadable/component'
import {withRedux} from '@store/withRedux'
import * as React from 'react'

const SnekFinder = loadable(() => import('@containers/SnekFinder'))

const FilesTab: React.FC<{}> = () => {
  return <SnekFinder />
}

export default withRedux(FilesTab)
