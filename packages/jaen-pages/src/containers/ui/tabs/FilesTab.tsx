import SnekFinder from '@containers/SnekFinder'
import loadable from '@loadable/component'
import {withRedux} from '@store/withRedux'
import * as React from 'react'

const FilesTab: React.FC<{}> = () => {
  return <SnekFinder />
}

export default withRedux(FilesTab)
