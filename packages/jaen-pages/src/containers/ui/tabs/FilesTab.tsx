import loadable from '@loadable/component'
import * as React from 'react'

import {withRedux} from '../../../store/withRedux'
import SnekFinder from '../../SnekFinder'

const FilesTab: React.FC<{}> = () => {
  return <SnekFinder />
}

export default withRedux(FilesTab)
