import {CloseOutlined, ZoomInOutlined, ZoomOutOutlined} from '@ant-design/icons'
// import {Space} from 'antd'
import {useEffect, useState} from 'react'

import PdfViewer from '../PdfViewer'
import * as S from './style'

export type PreviewTypes = 'IMAGE' | 'PDF'

type FilePreviewProps = {
  onClose: () => void
  visible: boolean
  src: string
  type: PreviewTypes
}

const FilePreview: React.FC<FilePreviewProps> = ({
  onClose,
  visible,
  src,
  type
}) => {
  const [scale, setScale] = useState<number>(1)

  useEffect(() => {
    setScale(1)
  }, [src])

  const onSetScale = (t: number): void => {
    let newScale = t ? scale + 0.1 : scale - 0.1

    if (newScale > 3) {
      newScale = 3
    } else if (newScale < 0.1) {
      newScale = 0.1
    }

    setScale(newScale)
  }

  const zoomStyle = {
    marginLeft: 10,
    cursor: 'pointer'
  }

  return (
    <S.FilePreview
      visible={visible}
      className="noselect"
      onWheel={event => {
        if (event.nativeEvent.deltaY > 0) {
          onSetScale(1)
        } else if (event.nativeEvent.deltaY <= 0) {
          onSetScale(0)
        }
      }}>
      {type === 'IMAGE' && (
        <S.Header>
          (
          <S.HeaderElement>
            <span>{Math.round(scale * 100)}%</span>
            <ZoomOutOutlined
              style={{...zoomStyle, opacity: scale === 0.1 ? 0.5 : 1}}
              onClick={() => onSetScale(0)}
            />
            <ZoomInOutlined
              style={{...zoomStyle, opacity: scale === 2 ? 0.5 : 1}}
              onClick={() => onSetScale(1)}
            />
          </S.HeaderElement>
          )
          <S.HeaderElement style={{fontSize: '120%'}}>
            <CloseOutlined onClick={onClose} />
          </S.HeaderElement>
        </S.Header>
      )}
      <S.Content
        onClick={event => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}>
        {src && (
          <>
            {type === 'IMAGE' && <S.Image scale={scale} alt="" src={src} />}
            {type === 'PDF' && <PdfViewer src={src} />}
          </>
        )}
      </S.Content>
    </S.FilePreview>
  )
}

export default FilePreview
