import {
  registerPageField,
  unregisterPageField,
  updatePageField
} from '@actions/siteActions'
import JaenImage, {ImageType} from '@containers/JaenImage'
import {useTemplate} from '@contexts/template'
import {
  FieldIdentifier,
  FieldUpdateDetails,
  FileBlock,
  TextBlock
} from '@src/types'
import {store, useAppDispatch, useAppSelector} from '@store/index'
import {pageFieldContentSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import React, {useEffect} from 'react'
import {Provider as ReduxProvider, useSelector} from 'react-redux'

interface ImageFieldProps extends FieldIdentifier {
  initValue: ImageType
}

const ImageField: React.FC<ImageFieldProps> = ({...field}) => {
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
  const updatedValue = content as FileBlock
  const isRegistered = updatedValue !== undefined

  const value = isRegistered ? updatedValue : initValue

  const handleOnChange = (data: ImageType) => {
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
            _type: 'FileBlock',
            ...data
          }
        }
      } else {
        fieldDetails = {
          _type: 'PlainField',
          fieldName,
          block: {
            _type: 'FileBlock',
            ...data
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
    <JaenImage
      onChange={handleOnChange}
      editable={isEditing}
      initialImage={{...value}}
      width={500}
      height={500}
    />
  )
}

export default withRedux(ImageField)
