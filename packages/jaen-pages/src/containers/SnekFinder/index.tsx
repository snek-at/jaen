import SnekFinder from '@snek-at/snek-finder'
import IPFSBackend from '@snek-at/snek-finder/lib/backends/IPFSBackend'
import * as actions from '@store/actions/sfActions'
import {store, useAppDispatch} from '@store/index'
import {withRedux} from '@store/withRedux'
import {useStaticQuery, graphql} from 'gatsby'
import * as React from 'react'

type FinderProps = {
  mode?: 'browser' | 'selector'
  onSelectorClose?: () => void
  onSelectorSelect?: (item: any) => void
}

const Finder: React.FC<FinderProps> = ({mode = 'browser', ...props}) => {
  const dispatch = useAppDispatch()
  const data = useStaticQuery(graphql`
    {
      jaenPagesInitials {
        snekFinder {
          initBackendLink
        }
      }
    }
  `)

  const initBackendLink =
    data.jaenPagesInitials.snekFinder.initBackendLink ||
    store.getState().sf.initBackendLink

  IPFSBackend.onBackendLinkChange = (link: string) => {
    dispatch(actions.setBackendLink(link))
  }

  React.useEffect(() => {
    if (initBackendLink) {
      IPFSBackend.initBackendLink = initBackendLink
    }
  })

  return <SnekFinder backend={IPFSBackend} mode={mode} {...props} />
}

export default withRedux(Finder)
