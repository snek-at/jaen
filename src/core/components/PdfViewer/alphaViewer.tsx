import {StepBackwardOutlined, StepForwardOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css'
import {useMemo, useState} from 'react'
import {Document, Page, pdfjs} from 'react-pdf'

import * as S from './style'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

type PdfViewerProps = {
  src: string
  onCancel: () => void
  visible: boolean
  scale: number
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  src,
  onCancel,
  visible,
  scale
}) => {
  const [pagesNumber, setPagesNumber] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  const file = useMemo(() => src, [src])

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}): void => {
    setPagesNumber(numPages)
    setPageNumber(1)
  }

  const changePage = (offset: number): void => {
    setPageNumber(prevPageNumber => {
      const next = prevPageNumber + offset

      if (pagesNumber) {
        if (next > pagesNumber) {
          return 1
        } else if (next === 0) {
          return pagesNumber
        }
      }

      return next
    })
  }

  const previousPage = (): void => {
    changePage(-1)
  }

  const nextPage = (): void => {
    changePage(1)
  }

  const footer = (
    <S.Footer>
      <StepBackwardOutlined onClick={() => previousPage()} />
      <StepForwardOutlined onClick={() => nextPage()} />
    </S.Footer>
  )

  return (
    <div>
      <S.PdfViewer>
        <div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
          {footer}
        </div>
      </S.PdfViewer>
    </div>
  )
}
export default PdfViewer
