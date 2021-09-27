import {Provider as ReduxProvider} from 'react-redux'

import {store} from '.'
import {withStorageManager} from './localStorage'

export const withRedux = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => props => {
  const WrappedComp = withStorageManager(Component)

  return (
    <ReduxProvider store={store}>
      <WrappedComp {...props} />
    </ReduxProvider>
  )
}
