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
import {useDispatch, useSelector} from 'react-redux'
import {context} from '~/contexts'
import {AppDispatch, RootState} from '~/store'
import {components} from '~/types'

import SidebarEditor, {ButtonOptions} from '~/components/Editor'

import {updatePageField} from '~/store/actions/cms'
import {pageFieldTextSelector} from '~/store/selectors/cms'
import {FieldUpdateDetails} from '~/store/types/cms/dataLayer'

import './fields.scss'

type SubelementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type EditableFieldProps = {
  fieldOptions: components.EditableFieldOptions
  buttonOptions?: ButtonOptions
} & SubelementProps

export const EditableField: React.FC<EditableFieldProps> = ({...props}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {buttonOptions, fieldOptions, ...subProps} = props
  const {slug} = context.useCMSPageContext()
  const {fieldName, block} = fieldOptions

  const editable = useSelector((state: RootState) => state.cms.options.editing)

  const workingDataLayer = useSelector(
    (state: RootState) => state.cms.dataLayer.working
  )

  const content = useSelector(pageFieldTextSelector(slug, fieldName, block))
  const resetTrigger = useSelector(
    (state: RootState) => state.cms.dataLayer.values.forceUpdateTrigger
  )

  return (
    <div>
      <div className={editable ? 'field' : ''} {...subProps}>
        <SidebarEditor
          onChange={newContent => {
            let fieldDetails: FieldUpdateDetails

            if (block) {
              fieldDetails = {
                _type: 'BlocksField',
                blockFieldName: block.blockFieldName,
                blockPosition: block.position,
                fieldName,
                block: {
                  _type: 'TextBlock',
                  text: newContent
                }
              }
            } else {
              fieldDetails = {
                _type: 'PlainField',
                fieldName,
                block: {
                  _type: 'TextBlock',
                  text: newContent
                }
              }
            }

            dispatch(
              updatePageField({
                slug,
                fieldDetails,
                workingDataLayer
              })
            )
          }}
          text={content}
          buttonOptions={buttonOptions}
          editable={editable}
          resetTrigger={resetTrigger}
        />
      </div>
    </div>
  )
}

export default EditableField
