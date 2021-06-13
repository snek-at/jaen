/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'
import {connect, useStore} from 'react-redux'
import {context} from '~/contexts'
import {components, PageParamsType} from '~/types'
import {store} from '~/types'

import SidebarEditor, {ButtonOptions} from '~/components/Editor'

import {updatePageContent} from '~/store/cmsActions'

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

  const pageContext = context.useCMSPageContext()
  const store = useStore<store.RootState>()

  const {fieldName, block} = fieldOptions
  const page = pageContext.page
  
  let field =
    store.getState().cms.dataLayer.editing.pages[page.slug]?.fields[fieldName]

  if (!field) {
    field = workingLayer.pages[page.slug]?.fields[fieldName]
  }

  let content: string | undefined

  if (field) {
    if (block && field.blocks) {
      content = field.blocks[block.position]?.fields?.[block.blockFieldName]
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
