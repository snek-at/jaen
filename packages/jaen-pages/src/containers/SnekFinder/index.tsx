import SnekFinder from '@snek-at/snek-finder'
import OSGBackend from '@snek-at/snek-finder/lib/backends/OSGBackend'
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

  const [loading, setLoading] = React.useState(true)

  const initBackendLink =
    store.getState().sf.initBackendLink ||
    data.jaenPagesInitials.snekFinder.initBackendLink

  OSGBackend.onBackendLinkChange = (link: string) => {
    dispatch(actions.setBackendLink(link))
  }

  React.useEffect(() => {
    if (initBackendLink) {
      OSGBackend.initBackendLink = initBackendLink

      const run = async () => {
        const response = await (await fetch(initBackendLink)).json()

        localStorage.setItem(
          'snek-finder-osg-backend-root',
          JSON.stringify(response)
        )

        setLoading(false)
      }

      run()
    }
  })

  return loading ? null : (
    <SnekFinder backend={OSGBackend} mode={mode} {...props} />
  )
}

export default withRedux(Finder)
