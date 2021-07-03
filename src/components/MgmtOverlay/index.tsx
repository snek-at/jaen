import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {store as storeTypes} from '~/types'

import Menu from '~/components/Menu'
import LoginModal from '~/components/modals/Login'

import {login} from '~/store/actions/auth'
import {toggleMenu} from '~/store/actions/cms'

const MgmtOverlay: React.FC = () => {
  const dispatch = useDispatch<storeTypes.AppDispatch>()

  const {loading, authenticated} = useSelector(
    (state: storeTypes.RootState) => state.auth
  )

  useEffect(() => {
    dispatch(login({}))
  }, [])

  return (
    <>
      {!authenticated && !loading && <LoginModal />}
      {authenticated && <Menu />}
      <img
        className="cms-edit"
        style={{maxWidth: 50}}
        src="https://avatars.githubusercontent.com/u/55870326?s=200&v=4"
        title="Edit with snek"
        onClick={() => dispatch(toggleMenu(true))}
      />
    </>
  )
}

export default MgmtOverlay
