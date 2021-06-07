/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React, {useEffect} from 'react'
import {connect, useStore} from 'react-redux'

import SidebarEditor from '~/components/Editor'

import {registerField, updatePageContent} from '~/store/cmsActions'
import {RootState, AppDispatch} from '~/store/store'

import {ButtonOptions} from '../Editor/index'
import {CMSEditableProps, FieldOptions} from '../types'

type SubelementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StateProps = CMSEditableProps

type DispatchProps = {
  registerField: (fieldOptions: FieldOptions) => void
  updateContent: (content: string) => void
}

export type OwnProps = {
  fieldOptions: FieldOptions
  buttonOptions?: ButtonOptions
}

export interface EditableTextFieldProps
  extends SubelementProps,
    StateProps,
    DispatchProps,
    OwnProps {}

export const EditableTextField: React.FC<EditableTextFieldProps> = ({
  registerField,
  updateContent,
  ...props
}) => {
  const {buttonOptions, fieldOptions, editable, workingLayer, ...subProps} =
    props
  const {page, name, block} = fieldOptions
  const store = useStore<RootState>()

  useEffect(() => registerField(fieldOptions), [])

  // equalityFn: () => true; workaround to prevent re-renders on store change
  let field =
    store.getState().cms.dataLayer.editing.pages[page.slug]?.fields[name]

  if (!field) {
    field = workingLayer.pages[page.slug]?.fields[name]
  }

  let content

  if (field) {
    console.log(field, fieldOptions)
    if (block && field.blocks) {
      console.log(field.blocks)
      content = field.blocks[block.position]?.content
    } else {
      content = field.content
    }
  }

  return (
    <div {...subProps}>
      <SidebarEditor
        onChange={updateContent}
        text={content}
        buttonOptions={buttonOptions}
        editable={editable}
        recreateTrigger={workingLayer.updateFieldsCount}
      />
    </div>
  )
}

const mapStateToProps = (
  state: RootState,
  _ownProps: OwnProps
): StateProps => ({
  workingLayer: state.cms.dataLayer.working,
  editable: state.cms.options.editing
})

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: OwnProps
): DispatchProps => ({
  registerField: (fieldOptions: FieldOptions) =>
    dispatch(registerField(fieldOptions)),
  updateContent: (content: string) =>
    dispatch(updatePageContent({content, fieldOptions: ownProps.fieldOptions}))
})

const EditableTextFieldContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(EditableTextField)

export default EditableTextFieldContainer
