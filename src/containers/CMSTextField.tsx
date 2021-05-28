/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {connect} from 'react-redux'

import TextField from '~/components/TextField'

import {updatePageContent} from '~/store/cmsActions'
import {AppDispatch, RootState} from '~/store/store'
import {CMSBlock, CMSField} from '~/store/types'

const mapStateToProps = ({cms}: RootState) => ({
  editable: cms.editingMode
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateContent: (element: CMSField | CMSBlock) =>
    dispatch(updatePageContent({element}))
})

export const CMSTextField = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextField)
