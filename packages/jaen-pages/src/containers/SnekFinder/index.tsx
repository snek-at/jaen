import loadable from '@loadable/component'
import SnekFinder from '@snek-at/snek-finder'
import IPFSBackend from '@snek-at/snek-finder/lib/backends/IPFSBackend'
import * as actions from '@store/actions/sfActions'
import {useAppDispatch, useAppSelector} from '@store/index'
import {withRedux} from '@store/withRedux'
import * as React from 'react'

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
