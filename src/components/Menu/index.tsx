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
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useCMSContext} from '~/contexts/context'

import {logout} from '~/store/actions/auth'
import {
  toggleEditing,
  toggleMenu,
  discardEditing,
  publish,
  registerPage,
  unregisterPage
} from '~/store/actions/cms'
import {pageTreeSelector} from '~/store/selectors/cms'
import {RootState, AppDispatch} from '~/store/types'

import Explorer from '../Explorer'
import {SnekIcon} from '../icons'

const {Text} = Typography

export type CMSMenuProps = {}

export const Menu: React.FC<CMSMenuProps> = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {registeredPages, pagesDetails, rootPageSlug} = useCMSContext()

  const {treeData, indexKeyRefs, childPageTypeNamesKeyRefs} = useSelector(
    pageTreeSelector(registeredPages)
  )
  const {showMenu, editing} = useSelector(
    (state: RootState) => state.cms.options
  )
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  )

  const toggleShow = () => dispatch(toggleMenu(!showMenu))

  const onPublish = () => {
    dispatch(publish())

    notification.success({
      message: 'The site will be published soon',
      description:
        'The site has been shipped to production. In about 30 seconds the new version is available.'
    })
  }

  return (
    <>
      <Drawer
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
                <Button key="logout" onClick={() => dispatch(logout())}>
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
                    <Button
                      danger
                      onClick={() => dispatch(toggleEditing(false))}>
                      Stop Editing
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => dispatch(toggleEditing(true))}>
                    Start Editing
                  </Button>
                )}
                <Button onClick={() => dispatch(discardEditing())}>
                  Discard
                </Button>
                <Button onClick={onPublish}>Publish</Button>
              </Space>
            </>
          </Row>
          <Divider />

          {treeData && indexKeyRefs && (
            <Explorer
              onNodeSave={node => {
                const {isDraft, slug} = node
                if (isDraft && slug) {
                  const page = pagesDetails[slug]
                  if (page && !page.deleted) {
                    return false
                  }
                }
                dispatch(registerPage({page: node, rootPageSlug, pagesDetails}))
                return true
              }}
              onNodeDelete={node =>
                dispatch(
                  unregisterPage({page: node, rootPageSlug, pagesDetails})
                )
              }
              indexTree={treeData}
              indexKeyRefs={indexKeyRefs}
              childPageTypeNamesKeyRefs={childPageTypeNamesKeyRefs}
            />
          )}
          <Divider />
        </>
      </Drawer>
    </>
  )
}

export default Menu
