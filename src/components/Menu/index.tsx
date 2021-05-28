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
import React from 'react'
import {useEffect} from 'react'

import LoginForm from '~/components/Login'

import {CMSMenuState} from '~/store/types'

// import LoginForm from '../Login'
// import {useState} from 'react'
import './cmsmenu.scss'

export interface CMSMenuProps extends CMSMenuState {
  authenticated: boolean
  showMenu: boolean
  editingMode: boolean
  login: (username: string, password: string) => void
  publish: () => void
  loadIndex: (checksum?: string) => void
  toggleMenu: (state: boolean) => void
  setEditingMode: (
    editing: boolean
  ) => {
    payload: boolean
    type: string
  }
}

const CMSMenu: React.FC<CMSMenuProps> = ({
  authenticated,
  showMenu,
  editingMode,
  index,
  login,
  publish,
  loadIndex,
  setEditingMode,
  toggleMenu
}) => {
  const toggleShow = () => toggleMenu(!showMenu)

  useEffect(() => {
    if (authenticated) {
      loadIndex(index?.checksum)
      setInterval(() => {
        loadIndex(index?.checksum)
      }, 1000 * 60 * 2)
    }
  }, [index?.checksum])

  return (
    <>
      <MDBModal
        show={showMenu}
        size="lg"
        getOpenState={(e: any) => toggleMenu(e)}
        backdrop
        tabIndex="-1">
        <MDBModalDialog centered size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Jaen</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
            </MDBModalHeader>
            {authenticated ? (
              <>
                <MDBModalBody>{JSON.stringify(index)}</MDBModalBody>

                <MDBModalFooter>
                  {!editingMode ? (
                    <MDBBtn color="info" onClick={() => setEditingMode(true)}>
                      edit
                    </MDBBtn>
                  ) : (
                    <>
                      <MDBBtn
                        color="warning"
                        onClick={() => setEditingMode(false)}>
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
              <LoginForm onSubmit={login} />
            )}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default CMSMenu
