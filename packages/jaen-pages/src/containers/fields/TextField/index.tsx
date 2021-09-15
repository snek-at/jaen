import Editor from '@containers/Editor'
import {useTemplate} from '@contexts/template'
import {BlockContextType, useBlock, useBlockContext} from '@src/contexts/block'
import {getFieldContent} from '@src/tools/fields'
import {
  BlockIdentifier,
  FieldIdentifier,
  FieldUpdateDetails,
  TextBlock
} from '@src/types'
import {
  registerPageField,
  unregisterPageField,
  updatePageField
} from '@store/actions/siteActions'
import {store, useAppDispatch, useAppSelector} from '@store/index'
import {pageFieldContentSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import React, {useEffect} from 'react'
import {Provider as ReduxProvider, useSelector} from 'react-redux'

interface TextFieldProps extends FieldIdentifier {
  rtf?: boolean
  toolbar?: 'inline' | 'balloon'
}

const TextField: React.FC<TextFieldProps> = ({
  rtf = true,
  toolbar = 'balloon',
  fieldName,
  initValue
}) => {
  const dispatch = useAppDispatch()
  const isEditing = useAppSelector(state => state.options.isEditing)
  const {jaenPageContext} = useTemplate()
  const pageId = jaenPageContext.id

  const {block, updatedFieldName} = useBlock(fieldName)
  fieldName = updatedFieldName

  const field = {initValue, fieldName, block}

  const register = () => dispatch(registerPageField({pageId, field}))
  const unregister = () => dispatch(unregisterPageField({pageId, field}))

  const content = useSelector(
    pageFieldContentSelector(pageId, fieldName, block)
  )

  const updatedValue = (content as TextBlock | undefined)?.text

  const contextValue = (getFieldContent(
    jaenPageContext.fields?.[fieldName],
    block
  ) as TextBlock | undefined)?.text

  const isRegistered = updatedValue !== undefined

  const value = isRegistered ? updatedValue : contextValue || initValue || ''

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

  // random Id
  const resetEditorReset =
    ((contextValue || initValue) === value && Math.random()) || undefined

  return (
    <Editor
      defaultData={{value, shouldOverrideRand: resetEditorReset}}
      editing={isEditing}
      onChange={handleOnChange}
      disableToolbar={!rtf}
    />
  )
}

export default withRedux(TextField)
