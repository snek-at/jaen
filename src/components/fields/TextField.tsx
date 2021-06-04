/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'
import {connect, useSelector} from 'react-redux'

import SidebarEditor from '~/components/Editor'

import {updatePageContent} from '~/store/cmsActions'
import {RootState, AppDispatch} from '~/store/store'

import {CMSEditableProps, FieldOptions} from '../types'

type SubelementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StateProps = CMSEditableProps

type DispatchProps = {
  updateContent: (content: string) => void
}

type OwnProps = {
  fieldOptions: FieldOptions
}

export interface EditableTextFieldProps
  extends SubelementProps,
    StateProps,
    DispatchProps,
    OwnProps {}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  updateContent,
  ...props
}) => {
  const onUpdateContent = (content: string) => updateContent(content)
  const {fieldOptions, editable, ...subProps} = props
  const {page, name, block} = fieldOptions

  // equalityFn: () => true; workaround to prevent re-renders on store change
  const field = useSelector(
    (state: RootState) => state.cms.edited?.pages[page.slug]?.fields[name],
    () => true
  )

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
        onChange={onUpdateContent}
        text={content}
        editable={editable}
      />
    </div>
  )
}

const mapStateToProps = (
  state: RootState,
  _ownProps: OwnProps
): StateProps => ({
  editable: state.cms.editingMode
})

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: OwnProps
): DispatchProps => ({
  updateContent: (content: string) =>
    dispatch(updatePageContent({content, fieldOptions: ownProps.fieldOptions}))
})

const TextField = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(EditableTextField)

export default TextField
