import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {context} from '~/contexts'
import {AppDispatch, RootState} from '~/store'
import {components} from '~/types'

import FilesModal from '~/components/MgmtOverlay/modals/Files'
import PdfViewer from '~/components/PdfViewer'

import {updatePageField, setFileRef} from '~/store/actions/cms'
import {pageFieldContentSelector, fileSelector} from '~/store/selectors/cms'
import {FileBlock} from '~/store/types/cms/blocks'
import {FieldUpdateDetails} from '~/store/types/cms/dataLayer'

import * as S from './style'

const defaultPdf = {
  url: 'http://www.africau.edu/images/default/sample.pdf'
}

type PdfFieldProps = {
  fieldOptions: components.EditableFieldOptions
  pdfClassName?: string
  pdfStyle?: React.CSSProperties
}

const PdfField: React.FC<PdfFieldProps> = ({
  fieldOptions,
  pdfClassName,
  pdfStyle
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
    useSelector(fileSelector((content as FileBlock)?.index)) || defaultPdf

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <S.Pdf
        onClick={() => editable && setShowModal(true)}
        editable={editable}
        className={pdfClassName}
        style={pdfStyle}>
        <PdfViewer src={file.url} />
      </S.Pdf>

      {showModal && (
        <FilesModal
          mode="CHOOSER_PDF"
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

export default PdfField
