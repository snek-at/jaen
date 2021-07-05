/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'
import {connect, useSelector} from 'react-redux'
import {context} from '~/contexts'
import {RootState} from '~/store'
import {components, PageParamsType, store} from '~/types'

import SidebarEditor, {ButtonOptions} from '~/components/Editor'

import {updatePageContent} from '~/store/actions/cms'
import {pageFieldContentSelector} from '~/store/selectors/cms'

import './fields.scss'

type SubelementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StateProps = components.CMSEditableProps

type DispatchProps = {
  updateContent: (content: string, page: PageParamsType) => void
}

export type OwnProps = {
  fieldOptions: components.EditableFieldOptions
  buttonOptions?: ButtonOptions
}

export interface EditableFieldProps
  extends SubelementProps,
    StateProps,
    DispatchProps,
    OwnProps {}

export const EditableField: React.FC<EditableFieldProps> = ({
  updateContent,
  ...props
}) => {
  const {buttonOptions, fieldOptions, editable, workingLayer, ...subProps} =
    props

  const {slug, typeName} = context.useCMSPageContext()
  const {fieldName, block} = fieldOptions

  const content = useSelector(pageFieldContentSelector(slug, fieldName, block))
  const discardCount = useSelector(
    (state: RootState) => state.cms.dataLayerDiscardCount
  )

  return (
    <div>
      <div className={editable ? 'field' : ''} {...subProps}>
        <SidebarEditor
          onChange={newContent => updateContent(newContent, {slug, typeName})}
          text={content}
          buttonOptions={buttonOptions}
          editable={editable}
          resetTrigger={discardCount}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (
  state: store.RootState,
  _ownProps: OwnProps
): StateProps => ({
  workingLayer: state.cms.dataLayer.working,
  editable: state.cms.options.editing
})

const mapDispatchToProps = (
  dispatch: store.AppDispatch,
  ownProps: OwnProps
): DispatchProps => ({
  updateContent: (content: string, page: PageParamsType) =>
    dispatch(
      updatePageContent({content, fieldOptions: ownProps.fieldOptions, page})
    )
})

const EditableFieldPropsContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  store.RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(EditableField)

export default EditableFieldPropsContainer
