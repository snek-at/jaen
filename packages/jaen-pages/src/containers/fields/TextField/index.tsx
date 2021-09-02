import React, {useEffect} from 'react'
import {Provider as ReduxProvider, useSelector} from 'react-redux'

import {useTemplate} from '../../../contexts/template'
import {store, useAppDispatch, useAppSelector} from '../../../store'
import {
  registerPageField,
  unregisterPageField,
  updatePageField
} from '../../../store/actions/siteActions'
import {pageFieldContentSelector} from '../../../store/selectors/pages'
import {withRedux} from '../../../store/withRedux'
import {getFieldContent} from '../../../tools/fields'
import {FieldIdentifier, FieldUpdateDetails, TextBlock} from '../../../types'
import Editor from '../../Editor'

interface TextFieldProps extends FieldIdentifier {
  rtf?: boolean
  toolbar?: 'inline' | 'balloon'
}

const TextField: React.FC<TextFieldProps> = ({
  rtf = true,
  toolbar = 'balloon',
  ...field
}) => {
  const dispatch = useAppDispatch()
  const isEditing = useAppSelector(state => state.options.isEditing)
  const {jaenPageContext} = useTemplate()
  const pageId = jaenPageContext.id

  const {initValue, fieldName, block} = field

  const register = () => dispatch(registerPageField({pageId, field}))
  const unregister = () => dispatch(unregisterPageField({pageId, field}))

  const content = useSelector(
    pageFieldContentSelector(pageId, fieldName, block)
  )

  const updatedValue = (content as TextBlock | undefined)?.text

  // const contextValue = (getFieldContent(
  //   jaenPageContext.fields?.[fieldName],
  //   block
  // ) as TextBlock | undefined)?.text

  const isRegistered = updatedValue !== undefined

  const value = isRegistered ? updatedValue : initValue || 'dadad'

  const handleOnChange = (data: string) => {
    if (!isRegistered && data !== initValue) {
      register()
    }
    if (data === initValue) {
      unregister()
    } else {
      let fieldDetails: FieldUpdateDetails

      if (block) {
        fieldDetails = {
          _type: 'BlocksField',
          blockFieldName: block.blockFieldName as string,
          blockPosition: block.position,
          fieldName,
          block: {
            _type: 'TextBlock',
            text: data
          }
        }
      } else {
        fieldDetails = {
          _type: 'PlainField',
          fieldName,
          block: {
            _type: 'TextBlock',
            text: data
          }
        }
      }

      dispatch(
        updatePageField({
          pageId,
          fieldDetails
        })
      )
    }
  }

  return (
    <>
      <Editor
        data={value}
        editing={isEditing}
        onChange={handleOnChange}
        disableToolbar={!rtf}
        toolbarType={toolbar}
      />
    </>
  )
}

export default withRedux(TextField)
