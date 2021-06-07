/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import md5 from 'crypto-js/md5'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import Menu from '~/components/Menu'

import {overrideWDL, toggleMenu} from '~/store/cmsActions'
import {AppDispatch, RootState} from '~/store/store'
import {DataLayer} from '~/store/types'

import {switchBridge} from './api'

interface CMSProps {
  toggleMenu: (state: boolean) => void
  bifrostUrls: {httpUrl: string; wssUrl?: string}
  layerOrigCksm?: string
  shouldOverrideWDL: boolean
  overrideWDL: ({data, cksm}: {data: DataLayer; cksm: string}) => void
  children: React.ReactNode
}

const CMSComponent: React.FC<CMSProps> = ({
  bifrostUrls,
  layerOrigCksm,
  shouldOverrideWDL,
  overrideWDL,
  ...props
}) => {
  useEffect(() => {
    fetch('original.jaen.json').then(res =>
      res.json().then((data: DataLayer) => {
        const cksm = md5(JSON.stringify(data)).toString()

        if (cksm !== layerOrigCksm || shouldOverrideWDL) {
          overrideWDL({data, cksm})
        }
      })
    )
  })

  switchBridge(bifrostUrls)
  console.log('render CMSComponent', shouldOverrideWDL)
  return (
    <>
      <Menu />
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
  layerOrigCksm: cms.dataLayer.origCksm,
  shouldOverrideWDL: cms.options.shouldOverrideWDL
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  overrideWDL: ({data, cksm}: {data: DataLayer; cksm: string}) =>
    dispatch(overrideWDL({data, cksm})),
  toggleMenu: (state: boolean) => dispatch(toggleMenu(state))
})

export const CMSWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSComponent)
