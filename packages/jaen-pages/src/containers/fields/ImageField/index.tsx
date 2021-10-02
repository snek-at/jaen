import {
  registerPageField,
  unregisterPageField,
  updatePageField
} from '@actions/siteActions'
import JaenImage, {ImageType, JaenImageProps} from '@containers/JaenImage'
import {useTemplate} from '@contexts/template'
import {useBlock} from '@src/contexts/block'
import {usePage} from '@src/contexts/cms'
import {
  FieldIdentifier,
  FieldUpdateDetails,
  ImageBlock,
  TextBlock
} from '@src/types'
import {store, useAppDispatch, useAppSelector} from '@store/index'
import {pageFieldContentSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import {GatsbyImage, GatsbyImageProps, getImage} from 'gatsby-plugin-image'
import React, {useEffect} from 'react'
import {Provider as ReduxProvider, useSelector} from 'react-redux'

interface ImageFieldProps extends FieldIdentifier, JaenImageProps {
  initValue: ImageType
}

const ImageField: React.FC<ImageFieldProps> = ({
  initValue,
  fieldName,
  ...props
}) => {
  const {block, updatedFieldName} = useBlock(fieldName)
  fieldName = updatedFieldName
  const field = {initValue, fieldName, block}

  const dispatch = useAppDispatch()
  const isEditing = useAppSelector(state => state.options.isEditing)
  const {jaenPageContext} = useTemplate()
  const pageId = props.pageId || jaenPageContext.id

  const page = usePage(pageId)

  const register = () => dispatch(registerPageField({pageId, field}))
  const unregister = () => dispatch(unregisterPageField({pageId, field}))

  const content = useSelector(
    pageFieldContentSelector(pageId, fieldName, block)
  )
  const updatedValue = content as ImageBlock
  const isRegistered = updatedValue !== undefined

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
            _type: 'ImageBlock',
            ...data
          }
        }
      } else {
        fieldDetails = {
          _type: 'PlainField',
          fieldName,
          block: {
            _type: 'ImageBlock',
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

  const image = page?.images?.find(({id}) => {
    if (id.pageId !== pageId || id.fieldName !== fieldName) {
      return false
    }

    if (id.block) {
      if (
        id.block.fieldName !== block?.blockFieldName ||
        id.block.position !== block?.position
      ) {
        return false
      }
    }

    return true
  })?.file

  return (
    <JaenImage
      initialImage={initValue}
      storeImage={updatedValue}
      contextImage={image?.childImageSharp.gatsbyImageData}
      editable={isEditing}
      onChange={handleOnChange}
      imageProps={props}
    />
  )
}

export default withRedux(ImageField)
