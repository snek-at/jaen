import loadable from '@loadable/component'
import IPFSBackend from '@snek-at/snek-finder/lib/backends/IPFSBackend'
import * as React from 'react'

import {useAppDispatch, useAppSelector} from '../../store'
import * as actions from '../../store/actions/sfActions'
import {withRedux} from '../../store/withRedux'

const SnekFinder = loadable(() => import('@snek-at/snek-finder'))

type FinderProps = {
  mode?: 'browser' | 'selector'
  onSelectorClose?: () => void
  onSelectorSelect?: (item: any) => void
}

const Finder: React.FC<FinderProps> = ({mode = 'browser', ...props}) => {
  const dispatch = useAppDispatch()
  const initBackendLink = useAppSelector(state => state.sf.initBackendLink)

  React.useEffect(() => {
    IPFSBackend.onBackendLinkChange = (link: string) => {
      dispatch(actions.setBackendLink(link))
    }
    if (initBackendLink) {
      IPFSBackend.initBackendLink = initBackendLink
    }
  })

  return <SnekFinder backend={IPFSBackend} mode={mode} {...props} />
}

export default withRedux(Finder)
