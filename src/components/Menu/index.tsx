/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit'
import React, {useState, useEffect} from 'react'
import ReactJson from 'react-json-view'
import {connect} from 'react-redux'

import LoginForm from '~/components/forms/Login'

import {login, logout} from '~/store/authActions'
import {
  toggleEditing,
  toggleMenu,
  loadIndex,
  discardEditing,
  loadPages,
  publish,
  setOverrideWDLState
} from '~/store/cmsActions'
import {AppDispatch} from '~/store/store'
import {RootState, AuthState, CMSState} from '~/store/types'

import './cmsmenu.scss'

type StateProps = AuthState & CMSState

type DispatchProps = {
  toggleEditing: (state: boolean) => void
  toggleMenu: (state: boolean) => void
  loadIndex: (checksum: string) => void
  discardEditing: () => void
  loadPages: () => void
  publish: () => void
  overrideWDLState: () => void
  login: (creds?: {username: string; password: string}) => void
  logout: () => void
}

type OwnProps = {}

export interface CMSMenuProps extends StateProps, DispatchProps, OwnProps {}

export const Menu: React.FC<CMSMenuProps> = ({
  authenticated,
  options,
  index,
  dataLayer,
  toggleEditing,
  toggleMenu,
  loadIndex,
  discardEditing,
  loadPages,
  publish,
  overrideWDLState,
  login,
  logout
}) => {
  const [view, setView] = useState<'INDEX' | 'EDITING'>('EDITING')

  const {showMenu, editing} = options

  const toggleShow = () => toggleMenu(!showMenu)
  const onLogin = (username: string, password: string) =>
    login({username, password})

  useEffect(() => login(), [])

  useEffect(() => {
    if (authenticated) loadIndex(index?.checksum || '')

    const interval = setInterval(() => {
      if (authenticated) loadIndex(index?.checksum || '')
    }, 1000 * 60 * 2)

    return () => clearInterval(interval)
  }, [index?.checksum, authenticated])

  return (
    <>
      <MDBModal
        show={showMenu}
        size="lg"
        getOpenState={(e: any) => {
          if (e !== showMenu) toggleMenu(e)
        }}
        tabIndex="-1">
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Jaen</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
            </MDBModalHeader>
            {authenticated ? (
              <>
                <MDBModalBody>
                  {view == 'INDEX' && (
                    <>
                      <h1>index view</h1>
                      <ReactJson src={index as object} theme="monokai" /> <br />
                      <button onClick={() => setView('EDITING')}>
                        goto Editing
                      </button>
                    </>
                  )}
                  {view == 'EDITING' && (
                    <>
                      <h1>editing view</h1>
                      <ReactJson
                        src={dataLayer.editing as object}
                        theme="monokai"
                      />{' '}
                      <br />
                      <button onClick={() => setView('INDEX')}>
                        goto Index
                      </button>
                    </>
                  )}
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="info" onClick={() => overrideWDLState()}>
                    override WDL
                  </MDBBtn>
                  <MDBBtn color="info" onClick={() => loadPages()}>
                    LDFB
                  </MDBBtn>
                  {!editing ? (
                    <>
                      {' '}
                      <MDBBtn color="danger" onClick={() => logout()}>
                        logout
                      </MDBBtn>
                      <MDBBtn color="info" onClick={() => toggleEditing(true)}>
                        edit
                      </MDBBtn>
                    </>
                  ) : (
                    <>
                      <MDBBtn color="info" onClick={() => discardEditing()}>
                        discard
                      </MDBBtn>
                      <MDBBtn
                        color="warning"
                        onClick={() => toggleEditing(false)}>
                        stop
                      </MDBBtn>
                      <MDBBtn color="success" onClick={() => publish()}>
                        publish
                      </MDBBtn>
                    </>
                  )}
                </MDBModalFooter>
              </>
            ) : (
              <LoginForm onSubmit={onLogin}></LoginForm>
            )}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

const mapStateToProps = ({auth, cms}: RootState): StateProps => ({
  options: cms.options,
  index: cms.index,
  dataLayer: cms.dataLayer,
  authenticated: auth.authenticated
})

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  toggleEditing: (state: boolean) => dispatch(toggleEditing(state)),
  toggleMenu: (state: boolean) => dispatch(toggleMenu(state)),
  loadIndex: (checksum: string) => dispatch(loadIndex({checksum})),
  discardEditing: () => dispatch(discardEditing()),
  loadPages: () => dispatch(loadPages()),
  publish: () => dispatch(publish()),
  overrideWDLState: () => dispatch(setOverrideWDLState(true)),
  login: (creds?: {username: string; password: string}) =>
    dispatch(login({creds})),
  logout: () => dispatch(logout())
})

const MenuContainer = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
