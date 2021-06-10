/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React, {useEffect} from 'react'
import {connect, useStore} from 'react-redux'
import {context} from '~/contexts'
import {components, PageParamsType} from '~/types'
import {store} from '~/types'

import SidebarEditor, {ButtonOptions} from '~/components/Editor'

import {registerField, updatePageContent} from '~/store/cmsActions'

type SubelementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StateProps = components.CMSEditableProps

type DispatchProps = {
  registerField: (
    fieldOptions: components.FieldOptions,
    page: PageParamsType
  ) => void
  updateContent: (content: string, page: PageParamsType) => void
}

export type OwnProps = {
  fieldOptions: components.FieldOptions
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

  const pageContext = context.useCMSPageContext()
  const store = useStore<store.RootState>()

  const {name, block} = fieldOptions
  const page = pageContext.page

  useEffect(() => registerField(fieldOptions, page), [])

  // equalityFn: () => true; workaround to prevent re-renders on store change
  let field =
    store.getState().cms.dataLayer.editing.pages[page.slug]?.fields[name]

  if (!field) {
    field = workingLayer.pages[page.slug]?.fields[name]
  }

  let content

  if (field) {
    if (block && field.blocks) {
      content = field.blocks[block.position]?.content
    } else {
      content = field.content
    }
  }

  return (
    <div {...subProps}>
      <SidebarEditor
        onChange={content => updateContent(content, page)}
        text={content}
        buttonOptions={buttonOptions}
        editable={editable}
        recreateTrigger={workingLayer.updateFieldsCount}
      />
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
  registerField: (
    fieldOptions: components.FieldOptions,
    page: PageParamsType
  ) => dispatch(registerField({fieldOptions, page})),
  updateContent: (content: string, page: PageParamsType) =>
    dispatch(
      updatePageContent({content, fieldOptions: ownProps.fieldOptions, page})
    )
})

const EditableTextFieldContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  store.RootState
>(
  mapStateToProps,
  mapDispatchToProps
)(EditableTextField)

export default EditableTextFieldContainer
