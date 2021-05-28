/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {connect} from 'react-redux'

import CMSMenu from '~/components/Menu'

import {
  loadIndex,
  login,
  publishPageContent,
  setEditingMode,
  toggleMenu
} from '~/store/cmsActions'
import {AppDispatch, RootState} from '~/store/store'

const mapStateToProps = ({cms}: RootState) => ({
  authenticated: cms.authenticated,
  showMenu: cms.showMenu,
  editingMode: cms.editingMode,
  index: cms.menu.index
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  login: (username: string, password: string) =>
    dispatch(login({username, password})),
  loadIndex: (checksum?: string) => dispatch(loadIndex({checksum})),
  toggleMenu: (state: boolean) => dispatch(toggleMenu(state)),
  setEditingMode: (state: boolean) => dispatch(setEditingMode(state)),
  publish: () => dispatch(publishPageContent({}))
})

export const CMSMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSMenu)
