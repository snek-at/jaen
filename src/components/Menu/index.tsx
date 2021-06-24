/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  Button,
  Divider,
  Row,
  Space,
  Drawer,
  Typography,
  notification
} from 'antd'
import React, {useState} from 'react'
import ReactJson from 'react-json-view'
import {connect} from 'react-redux'
import {useCMSContext} from '~/contexts/context'
import {store} from '~/types'

import Explorer, {PageNode} from '~/components/Explorer/index'
import {SnekIcon} from '~/components/icons'

import {logout} from '~/store/authActions'
import {
  toggleEditing,
  toggleMenu,
  discardEditing,
  publish,
  deletePageFromIndex,
  transferPageToIndex
} from '~/store/cmsActions'

import './cmsmenu.scss'

const {Text} = Typography

type StateProps = store.AuthState & store.CMSState

type DispatchProps = {
  toggleEditing: (state: boolean) => void
  toggleMenu: (state: boolean) => void
  discardEditing: () => void
  publish: () => void
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
  publish,
  logout,
  transferPageToIndex,
  deletePageFromIndex
}) => {
  const [view, setView] = useState<'EXPLORER' | 'EXPERT'>('EXPLORER')

  const {showMenu, editing} = options

  const toggleShow = () => toggleMenu(!showMenu)

  const onPublish = () => {
    publish()

    notification.success({
      message: 'The site will be published soon',
      description:
        'The site has been shipped to production. In about 30 seconds the new version is available.'
    })
  }

  const cmsContext = useCMSContext()

  const {treeData, keyRefs} = cmsContext

  return (
    <>
      <Drawer
        className="menu-drawer"
        title={
          <>
            <Space>
              <SnekIcon />
              <Text>jaen - Content Management System</Text>
            </Space>
          </>
        }
        visible={showMenu}
        onClose={toggleShow}
        width={window.innerWidth > 900 ? 800 : window.innerWidth - 100}
        footer={[
          <React.Fragment key={'control-group'}>
            {authenticated && (
              <>
                {view === 'EXPLORER' && (
                  <Button key="expert" onClick={() => setView('EXPERT')}>
                    Expert
                  </Button>
                )}
                {view === 'EXPERT' && (
                  <Button key="explorer" onClick={() => setView('EXPLORER')}>
                    Explorer
                  </Button>
                )}
                <Button key="logout" onClick={() => logout()}>
                  Sign out
                </Button>
              </>
            )}
          </React.Fragment>
        ]}>
        <>
          <Row justify={'start'}>
            <>
              <Space>
                {editing ? (
                  <>
                    <Button danger onClick={() => toggleEditing(false)}>
                      Stop Editing
                    </Button>
                    <Button onClick={() => discardEditing()}>Discard</Button>
                  </>
                ) : (
                  <Button onClick={() => toggleEditing(true)}>
                    Start Editing
                  </Button>
                )}
                <Button onClick={onPublish}>Publish</Button>
              </Space>
            </>
          </Row>
          <Divider />

          {view === 'EXPLORER' && treeData && keyRefs && (
            <Explorer
              onNodeSave={node => {
                const {isDraft, slug} = node
                if (isDraft && slug) {
                  if (index?.pages[slug]) {
                    return false
                  }
                }
                transferPageToIndex(node)
                return true
              }}
              onNodeDelete={deletePageFromIndex}
              indexTree={treeData}
              indexKeyRefs={keyRefs.indexKey}
              childPageTypeNamesKeyRefs={keyRefs.childPageTypeNamesKey}
            />
          )}
          {view === 'EXPERT' && (
            <>
              <ReactJson
                src={{index: index, dataLayer: dataLayer}}
                theme={'monokai'}
              />
            </>
          )}
          <Divider />
        </>
      </Drawer>
    </>
  )
}

const mapStateToProps = ({auth, cms}: store.RootState): StateProps => ({
  settings: cms.settings,
  options: cms.options,
  index: cms.index,
  dataLayer: cms.dataLayer,
  authenticated: auth.authenticated
})

const mapDispatchToProps = (dispatch: store.AppDispatch): DispatchProps => ({
  toggleEditing: (state: boolean) => dispatch(toggleEditing(state)),
  toggleMenu: (state: boolean) => dispatch(toggleMenu(state)),
  discardEditing: () => dispatch(discardEditing()),
  publish: () => dispatch(publish()),
  logout: () => dispatch(logout()),
  transferPageToIndex: (page: PageNode) => dispatch(transferPageToIndex(page)),
  deletePageFromIndex: (page: PageNode) => dispatch(deletePageFromIndex(page))
})

const MenuContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  store.RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
