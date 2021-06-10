/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Button} from 'antd'
import Modal from 'antd/lib/modal/Modal'
// import {
//   MDBBtn,
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalTitle,
//   MDBModalBody,
//   MDBModalFooter
// } from 'mdb-react-ui-kit'
import React, {useState, useEffect, useContext} from 'react'
// import ReactJson from 'react-json-view'
import {connect} from 'react-redux'
import {CMSContext} from '~/context'

import LoginForm from '~/components/forms/Login'

import {login, logout} from '~/store/authActions'
import {
  toggleEditing,
  toggleMenu,
  discardEditing,
  loadPages,
  publish,
  setOverrideWDLState,
  deletePageFromIndex
} from '~/store/cmsActions'
import {AppDispatch} from '~/store/store'
import {RootState, AuthState, CMSState} from '~/store/types'

import {transferPageToIndex} from '../../store/cmsActions'
import Explorer from '../Explorer/index'
import {ExplorerTDN, PageNode} from '../Explorer/index'
import {LoginFormValues} from '../forms/Login'
import './cmsmenu.scss'
import {
  transformIndexTree,
  IndexKeyRefs,
  ChildPageTypeNamesKeyRefs
} from './utils'

type StateProps = AuthState & CMSState

type DispatchProps = {
  toggleEditing: (state: boolean) => void
  toggleMenu: (state: boolean) => void
  discardEditing: () => void
  loadPages: () => void
  publish: () => void
  overrideWDLState: () => void
  login: (creds?: {username: string; password: string}) => void
  logout: () => void
  transferPageToIndex: (page: PageNode) => void
  deletePageFromIndex: (page: PageNode) => void
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
  discardEditing,
  loadPages,
  publish,
  overrideWDLState,
  login,
  logout,
  transferPageToIndex,
  deletePageFromIndex
}) => {
  const [view, setView] = useState<'EXPLORER' | 'EDITING'>('EXPLORER')

  const {showMenu, editing} = options

  const toggleShow = () => toggleMenu(!showMenu)
  const onLogin = (values: LoginFormValues) => {
    const {username, password} = values
    login({username, password})
  }

  useEffect(() => login(), [])

  console.log(
    view,
    setView,
    editing,
    index,
    dataLayer,
    toggleEditing,
    discardEditing,
    loadPages,
    publish,
    overrideWDLState,
    logout
  )

  const [explorerIndexTree, setExplorerIndexTree] = useState<ExplorerTDN[]>()
  const [indexKeyRefs, setIndexKeyRefs] = useState<IndexKeyRefs>()
  const [childPageTypeNamesKeyRefs, setChildPageTypeNamesKeyRefs] =
    useState<ChildPageTypeNamesKeyRefs>()

  const cmsContext = useContext(CMSContext)

  console.log('CONTEXT', cmsContext)

  useEffect(() => {
    if (index) {
      if (cmsContext) {
        const {treeData, indexKeyRefs, childPageTypeNamesKeyRefs} =
          transformIndexTree(index, cmsContext)

        setExplorerIndexTree(treeData)
        setIndexKeyRefs(indexKeyRefs)
        setChildPageTypeNamesKeyRefs(childPageTypeNamesKeyRefs)
      }
    }
  }, [index, cmsContext])

  console.log(childPageTypeNamesKeyRefs)

  // const context = useContext(CMSContext)

  // console.log(context?.registeredPages, context?.getRegisteredPage('HomePage'))

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        visible={showMenu}
        onOk={toggleShow}
        onCancel={toggleShow}
        width={1000}
        footer={[
          <Button key="back" onClick={toggleShow}>
            Return
          </Button>
        ]}>
        {!authenticated ? (
          <LoginForm onFinish={onLogin} />
        ) : (
          <>
            {view === 'EXPLORER' &&
              explorerIndexTree &&
              indexKeyRefs &&
              childPageTypeNamesKeyRefs && (
                <Explorer
                  onNodeSave={node => {
                    const {isDraft, slug} = node
                    if (isDraft && slug) {
                      if (index?.pages[slug]) {
                        return false
                      }
                      transferPageToIndex(node)
                    }
                    return true
                  }}
                  onNodeDelete={deletePageFromIndex}
                  indexTree={explorerIndexTree}
                  indexKeyRefs={indexKeyRefs}
                  childPageTypeNamesKeyRefs={childPageTypeNamesKeyRefs}
                />
              )}
          </>
        )}
      </Modal>
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
  discardEditing: () => dispatch(discardEditing()),
  loadPages: () => dispatch(loadPages()),
  publish: () => dispatch(publish()),
  overrideWDLState: () => dispatch(setOverrideWDLState(true)),
  login: (creds?: {username: string; password: string}) =>
    dispatch(login({creds})),
  logout: () => dispatch(logout()),
  transferPageToIndex: (page: PageNode) => dispatch(transferPageToIndex(page)),
  deletePageFromIndex: (page: PageNode) => dispatch(deletePageFromIndex(page))
})

const MenuContainer = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
