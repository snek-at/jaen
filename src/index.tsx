/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'
import {connect} from 'react-redux'

// import {CMSMenuContainer as CMSMenu} from '~/containers/CMSMenu'
// import {toggleMenu} from '~/store/cmsActions'
import {AppDispatch, RootState} from '~/store/store'

import {switchBridge} from './api'

interface CMSProps {
  toggleMenu: (state: boolean) => void
  bifrostUrls: {httpUrl: string; wssUrl?: string}
  children: React.ReactNode
}

const CMSComponent: React.FC<CMSProps> = props => {
  const {bifrostUrls} = props

  switchBridge(bifrostUrls)

  return (
    <>
      {/* <CMSMenu /> */}
      {props.children}
      <img
        className="btn btn-dark btn-lg btn-floating cms-edit"
        src="https://avatars.githubusercontent.com/u/55870326?s=200&v=4"
        data-mdb-toggle="popover"
        title="Edit with snek"
        onClick={() => props.toggleMenu(true)}
      />
    </>
  )
}

const mapStateToProps = ({cms}: RootState) => ({
  editable: cms.editingMode
})

const mapDispatchToProps = (_dispatch: AppDispatch) => ({
  toggleMenu: (_state: boolean) => {}
})

export const CMSWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSComponent)
