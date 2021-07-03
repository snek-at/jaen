/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  EditOutlined,
  CloudUploadOutlined,
  MenuOutlined,
  DeleteOutlined,
  EditFilled,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import {useEffect} from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {store as storeTypes} from '~/types'

import LoginModal from '~/components/modals/Login'

import {login, logout} from '~/store/actions/auth'
import {discardEditing, toggleEditing} from '~/store/actions/cms'

import SideMenu from './SideMenu'
import SnekFabButton from './SnekFabButton'
import './mgmtOverlay.scss'
import PublishModal from './modals/Publish'
import SiteMenu from './modals/SiteMenu'

const MgmtOverlay: React.FC = () => {
  const dispatch = useDispatch<storeTypes.AppDispatch>()

  const [showLoginModal, setShowLoginModal] = useState(false)

  const {loading, authenticated} = useSelector(
    (state: storeTypes.RootState) => state.auth
  )

  const editing = useSelector(
    (state: storeTypes.RootState) => state.cms.options.editing
  )

  useEffect(() => {
    dispatch(login({}))
  }, [])

  useEffect(() => {
    if (authenticated) {
      setShowLoginModal(false)
    }
  }, [authenticated, loading])

  return (
    <>
      <SnekFabButton
        fabOptions={[
          authenticated
            ? {
                text: 'Logout',
                icon: <LogoutOutlined />,
                onClick: () => {
                  dispatch(logout())
                  dispatch(toggleEditing(false))
                }
              }
            : {
                text: 'Login',
                icon: <LoginOutlined />,
                onClick: () => setShowLoginModal(true)
              }
        ]}
      />

      {showLoginModal && <LoginModal />}

      {authenticated && (
        <SideMenu
          items={[
            {
              text: 'Site Menu',
              icon: <MenuOutlined />,
              onClick: () => null,
              renderElementOnClick: <SiteMenu />
            },
            {
              text: editing ? 'Preview' : 'Edit',
              icon: editing ? <EditFilled /> : <EditOutlined />,
              onClick: () => dispatch(toggleEditing(!editing))
            },
            {
              text: 'Publish',
              icon: <CloudUploadOutlined />,
              onClick: () => null,
              renderElementOnClick: <PublishModal />
            },
            {
              text: 'Discard changes',
              icon: <DeleteOutlined />,
              onClick: () => dispatch(discardEditing())
            }
          ]}
        />
      )}
    </>
  )
}

export default MgmtOverlay
