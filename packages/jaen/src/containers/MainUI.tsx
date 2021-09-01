import {ChakraProvider} from '@chakra-ui/react'
import loadable from '@loadable/component'

import {PluginUI} from '../plugin'
import {useAppDispatch, useAppSelector} from '../store'
import * as authActions from '../store/actions/authActions'
import {withRedux} from '../store/withRedux'

const LoadableUI = loadable(
  () => import('@snek-at/jaen-shared-ui/dist/components/app/Main')
)

export type MainUIProps = {
  ui: PluginUI
}

const MainUI: React.FC<MainUIProps> = ({ui: {hotbar, tabs}}) => {
  const dispatch = useAppDispatch()
  const authenticated = useAppSelector(state => state.auth.authenticated)

  const handleLogin = async (username: string, password: string) => {
    const res = (await dispatch(
      authActions.login({creds: {username, password}})
    )) as any

    console.log('res', res.error)

    if (res.error) {
      console.log('false')
      return false
    }

    return true
  }

  const handleGuestLogin = () => {
    return handleLogin('snekman', 'ciscocisco')
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <ChakraProvider>
      <LoadableUI
        hotbar={hotbar}
        tabs={tabs}
        header={{onLogout: handleLogout}}
        authenticated={authenticated}
        login={{onLogin: handleLogin, onGuestLogin: handleGuestLogin}}
      />
    </ChakraProvider>
  )
}

export default withRedux(MainUI)
