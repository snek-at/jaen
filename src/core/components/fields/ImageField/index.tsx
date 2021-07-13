import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {context} from '~/contexts'
import {AppDispatch, RootState} from '~/store'
import {components} from '~/types'

import FilesModal from '~/components/MgmtOverlay/modals/Files'

import {updatePageField, setFileRef} from '~/store/actions/cms'
import {pageFieldContentSelector, fileSelector} from '~/store/selectors/cms'
import {FileBlock} from '~/store/types/cms/blocks'
import {FieldUpdateDetails} from '~/store/types/cms/dataLayer'

import * as S from './style'

const defaultImage = {
  url: 'https://i.pinimg.com/originals/22/4e/77/224e771c14280dc2cc6ba4e9e95155eb.jpg',
  meta: {
    title: 'No image selected',
    description: 'No image selected'
  }
}

type ImageFieldProps = {
  fieldOptions: components.EditableFieldOptions
  imageClassName?: string
  imageStyle?: React.CSSProperties
}

const ImageField: React.FC<ImageFieldProps> = ({
  fieldOptions,
  imageClassName,
  imageStyle
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const {slug} = context.useCMSPageContext()
  const {fieldName, block} = fieldOptions

  const editable = useSelector((state: RootState) => state.cms.options.editing)
  const workingDataLayer = useSelector(
    (state: RootState) => state.cms.dataLayer.working
  )

  const content = useSelector(pageFieldContentSelector(slug, fieldName, block))

  const file =
    useSelector(fileSelector((content as FileBlock)?.index)) || defaultImage
  // eslint-disable-next-line no-console
  console.log('content', content)

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <S.Image
        onClick={() => editable && setShowModal(true)}
        editable={editable}
        className={imageClassName}
        style={imageStyle}
        title={file.meta.title}
        alt={file.meta.description}
        src={file.url}
      />

      {showModal && (
        <FilesModal
          mode="CHOOSER_IMAGE"
          onChoose={index => {
            setShowModal(false)

            let fieldDetails: FieldUpdateDetails
            let fieldRef: string

            if (block) {
              fieldDetails = {
                _type: 'BlocksField',
                blockFieldName: block.blockFieldName,
                blockPosition: block.position,
                fieldName,
                block: {
                  _type: 'FileBlock',
                  index
                }
              }

              fieldRef = `${slug}.${fieldName}.${block.position}.${block.blockFieldName}`
            } else {
              fieldDetails = {
                _type: 'PlainField',
                fieldName,
                block: {
                  _type: 'FileBlock',
                  index
                }
              }

              fieldRef = `${slug}.${fieldName}`
            }

            dispatch(
              updatePageField({
                slug,
                fieldDetails,
                workingDataLayer
              })
            )

            dispatch(setFileRef({fieldRef, fileIndex: index}))
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export default ImageField
