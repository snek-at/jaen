import loadable from '@loadable/component'
import {PluginUI} from '@src/plugin'

import jaenTheme from '../@chakra-ui/jaenTheme'
import {useAppDispatch, useAppSelector} from '../store'
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

  const login = async (
    username: string,
    password: string,
    isGuest: boolean
  ) => {
    const {login} = await import('../store/actions/authActions')

    const res = (await dispatch(
      login({creds: {username, password}, isGuest})
    )) as any

    if (res.error) {
      return false
    }

    return true
  }

  const handleLogin = async (username: string, password: string) => {
    return login(username, password, username === 'snekman')
  }

  const handleGuestLogin = async () => {
    return login('snekman', 'ciscocisco', true)
  }

  const handleLogout = async () => {
    const {logout} = await import('../store/actions/authActions')

    dispatch(logout())
  }

  return (
    <LoadableUI
      hotbar={hotbar}
      tabs={tabs}
      footer={{onLogout: handleLogout}}
      authenticated={authenticated}
      login={{onLogin: handleLogin, onGuestLogin: handleGuestLogin}}
      chakraWorkaroundTheme={jaenTheme}
    />
  )
}

export default withRedux(MainUI)
