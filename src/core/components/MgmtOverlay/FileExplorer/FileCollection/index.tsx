/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {LoadingOutlined} from '@ant-design/icons'
import {Layout} from 'antd'
import {useState} from 'react'
import {Document, Page} from 'react-pdf'

import {FileInfo} from '~/store/types/cms/dataLayer'

import Image from '../Image'
import './filecollection.scss'

const {Content} = Layout

export type CollectionFile = {index: string} & FileInfo

export type FileCollectionProps = {
  files: CollectionFile[]
  onFileSelect?: (index: string | null) => void
  onFileUpdate?: (index: string, meta: FileInfo['meta']) => void
  onFileDelete?: (index: string) => void
  onFilePreview?: (index: string) => void
}

const FileCollection: React.FC<FileCollectionProps> = ({
  onFileSelect,
  onFilePreview,
  files
}) => {
  const [selectedFileIndex, setSelectedFile] = useState<string | null>(null)

  const onActiveSelect = (index: string | null): void => {
    setSelectedFile(index)
    if (onFileSelect) {
      onFileSelect(index)
    }
  }

  const onActivePreview = (): void => {
    if (onFilePreview && selectedFileIndex) {
      onFilePreview(selectedFileIndex)
    }
  }

  // const onActiveDelete = (): void => {
  //   if (onFileDelete && selectedFile) {
  //     onFileDelete(selectedFile.index)

  //     setSelectedFile(null)
  //   }
  // }

  return (
    <Layout className="layout">
      <Content
        className="content"
        onClick={event => {
          event.preventDefault()

          if (event.target === event.currentTarget) {
            onActiveSelect(null)
          }
        }}>
        {files.length === 0 ? (
          <div className="dropzone">
            <span>{"Drag 'n' drop some files here"}</span>
          </div>
        ) : (
          files.map((file, key) => (
            <>
              {file.meta.fileType?.startsWith('image') && (
                <Image
                  key={key}
                  className={`${
                    selectedFileIndex === file.index && 'active'
                  } element`}
                  onDoubleClick={onActivePreview}
                  onClick={() => {
                    onActiveSelect(file.index)
                  }}
                  src={file.url}
                  title={file.meta?.title}
                  alt={file.meta?.description}
                />
              )}
              {file.meta.fileType === 'application/pdf' && (
                <div
                  className={`${
                    selectedFileIndex === file.index && 'active'
                  } element`}
                  onDoubleClick={onActivePreview}
                  onClick={() => {
                    if (selectedFileIndex !== file.index) {
                      onActiveSelect(file.index)
                    }
                  }}>
                  <Document file={file.url} loading={<LoadingOutlined spin />}>
                    <Page
                      className={'document-page'}
                      pageNumber={1}
                      loading={<LoadingOutlined spin />}
                    />
                  </Document>
                </div>
              )}
            </>
          ))
        )}
      </Content>
    </Layout>
  )
}

export default FileCollection
