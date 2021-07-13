/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  DeleteTwoTone,
  EyeTwoTone,
  FileAddFilled,
  LoadingOutlined,
  SwapOutlined
} from '@ant-design/icons'
import {
  Row,
  Divider,
  Layout,
  Menu,
  Card,
  Collapse,
  Space,
  Button,
  Typography
} from 'antd'
import {omit} from 'lodash'
import {useEffect, useState} from 'react'
import Dropzone from 'react-dropzone'
import {Document, Page} from 'react-pdf'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '~/store'

import {getNextIndexedObjectKey} from '~/common/utils'

import FilePreview, {PreviewTypes} from '~/components/FilePreview'
import FileUploadButton from '~/components/FileUploadButton'

import {cmsActions} from '~/store/actions'
import {removeFile, updateFile} from '~/store/actions/cms'
import {filesSelector} from '~/store/selectors/cms'
import {FileInfo} from '~/store/types/cms/dataLayer'

import FileCollection from './FileCollection'
import Image from './Image'
import './fileexplorer.scss'

export type IndexedFile = {index: string} & FileInfo

type View = 'IMAGE' | 'PDF'

type FileExplorerProps = {
  chooserView?: View
  onChoose?: (fileIndex: string) => void
}

const FileExplorer: React.FC<FileExplorerProps> = ({chooserView, onChoose}) => {
  const dispatch = useDispatch<AppDispatch>()
  // eslint-disable-next-line no-console
  console.log('chooserView', chooserView)

  const forceUpdateTrigger = useSelector(
    (state: RootState) => state.cms.dataLayer.values.forceUpdateTrigger
  )
  const storedFiles = useSelector(filesSelector)

  const [files, setFiles] = useState(storedFiles)
  const [selectedFile, setSelectedFile] = useState<IndexedFile | null>(null)

  const onUpload = (acceptedFiles: File[]): void => {
    for (const acceptedFile of acceptedFiles) {
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFile)

      const meta = {fileType: acceptedFile.type, title: acceptedFile.name}

      reader.onload = () => {
        const dataUrl = reader.result?.toString()

        if (dataUrl) {
          // WA: Get latest files state in async context
          setFiles({
            ...files,
            [getNextIndexedObjectKey(files)]: {
              url: dataUrl,
              meta,
              refs: []
            }
          })
        }
      }

      dispatch(
        cmsActions.addFile({
          file: acceptedFile,
          fileMeta: meta
        })
      )
    }
  }

  const onFileSelect = (index: string | null): void => {
    if (index === null) {
      setSelectedFile(null)
    } else {
      if (selectedFile?.index !== index) {
        setSelectedFile({index, ...files[index]})
      }
    }
  }

  const onFileUpdate = (updateMeta: FileInfo['meta']): void => {
    if (selectedFile) {
      const meta = {
        ...selectedFile.meta,
        ...updateMeta
      }

      setSelectedFile({...selectedFile, meta})

      const index = selectedFile.index

      setFiles({
        ...files,
        [index]: {
          ...files[index],
          meta
        }
      })
      dispatch(updateFile({index, meta, combinedFiles: storedFiles}))
    }
  }

  const onFileDelete = (index: string): void => {
    setFiles(omit(files, index))
    dispatch(removeFile(index))
  }

  const [showPreview, setShowPreview] = useState<{
    src: string
    type: PreviewTypes
  } | null>(null)

  const onFilePreview = (index: string): void => {
    if (view === 'IMAGE') {
      setShowPreview({
        src: files[index].url,
        type: 'IMAGE'
      })
    }

    if (view === 'PDF') {
      setShowPreview({
        src: files[index].url,
        type: 'PDF'
      })
    }
  }

  const onFileChoose = (index: string): void => {
    // call onChoose if defined and index present in storedFiles
    if (onChoose && storedFiles[index]) {
      onChoose(index)
    }
  }

  const onClosePreview = (): void => {
    setShowPreview(null)
  }

  const [view, setView] = useState<View>(chooserView || 'IMAGE')

  useEffect(() => {
    setFiles(storedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdateTrigger, view])

  const fileCollection = (): JSX.Element => {
    const collection = Object.entries(files)
      .map(([index, file]) => {
        return {index, ...file}
      })
      .filter(e => {
        const fileType = e.meta.fileType

        if (!fileType) {
          return false
        }

        if (view === 'IMAGE' && fileType.startsWith('image/')) {
          return true
        }

        if (view === 'PDF' && fileType === 'application/pdf') {
          return true
        }

        return false
      })
      .reverse()

    return (
      <FileCollection
        onFileSelect={onFileSelect}
        onFileDelete={onFileDelete}
        onFileDoubleClick={chooserView ? onFileChoose : onFilePreview}
        files={collection}
      />
    )
  }

  return (
    <>
      {!!showPreview && (
        <FilePreview
          onClose={onClosePreview}
          visible={!!showPreview}
          src={showPreview.src}
          type={showPreview.type}
        />
      )}

      <Dropzone onDrop={onUpload}>
        {({getRootProps, getInputProps, isDragActive, isDragAccept}) => (
          <div {...getRootProps()} onClick={event => event.stopPropagation()}>
            <input {...getInputProps()} />
            {isDragActive && isDragAccept && (
              <div className="dropzone-overlay">
                <div className="text">
                  <FileAddFilled />
                </div>
              </div>
            )}

            <Layout className="layout">
              <Layout.Sider width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={chooserView === 'IMAGE' ? ['1'] : ['2']}
                  style={{height: '100%'}}>
                  <Row justify="center">
                    <FileUploadButton onUpload={onUpload} />
                  </Row>
                  <Divider plain orientation="left">
                    Media
                  </Divider>
                  <Menu.Item
                    key="1"
                    onClick={() => setView('IMAGE')}
                    disabled={chooserView && chooserView !== 'IMAGE'}>
                    Images
                  </Menu.Item>
                  <Divider plain orientation="left">
                    Documents
                  </Divider>
                  <Menu.Item
                    key="2"
                    onClick={() => setView('PDF')}
                    disabled={chooserView && chooserView !== 'PDF'}>
                    PDFs
                  </Menu.Item>
                </Menu>
              </Layout.Sider>
              <Layout.Content>{fileCollection()}</Layout.Content>
              <Layout.Sider width={350} className="sider">
                <Row justify="center">
                  <>
                    {selectedFile && (
                      <Card
                        hoverable
                        style={{width: 350}}
                        cover={
                          <>
                            {selectedFile.meta.fileType?.startsWith(
                              'image'
                            ) && (
                              <Image
                                alt={selectedFile.meta.description}
                                src={selectedFile.url}
                                style={{objectFit: 'contain', height: '25rem'}}
                              />
                            )}
                            {selectedFile.meta.fileType ===
                              'application/pdf' && (
                              <Document
                                file={selectedFile.url}
                                loading={<LoadingOutlined spin />}>
                                <Page
                                  className={'document-page'}
                                  pageNumber={1}
                                  loading={<LoadingOutlined spin />}
                                />
                              </Document>
                            )}
                          </>
                        }>
                        <Collapse defaultActiveKey={['1', '2']} ghost>
                          <Collapse.Panel header="Details" key="1">
                            <Typography.Text strong>Title: </Typography.Text>
                            <Typography.Text
                              editable={{
                                onChange: value => onFileUpdate({title: value})
                              }}>
                              {selectedFile.meta.title}
                            </Typography.Text>

                            <br />

                            <Typography.Text strong>Des: </Typography.Text>
                            <Typography.Text
                              editable={{
                                onChange: value =>
                                  onFileUpdate({description: value})
                              }}>
                              {selectedFile.meta.description}
                            </Typography.Text>
                          </Collapse.Panel>
                          <Collapse.Panel header="Actions" key="2">
                            <Space direction="vertical">
                              {chooserView && (
                                <Button
                                  shape="round"
                                  onClick={() =>
                                    onFileChoose(selectedFile.index)
                                  }>
                                  <SwapOutlined />
                                  Choose
                                </Button>
                              )}

                              <Space>
                                <Button
                                  shape="round"
                                  onClick={() =>
                                    onFilePreview(selectedFile.index)
                                  }>
                                  <EyeTwoTone />
                                  Preview
                                </Button>
                                <Button
                                  shape="round"
                                  onClick={() =>
                                    onFileDelete(selectedFile.index)
                                  }>
                                  <DeleteTwoTone />
                                  Delete
                                </Button>
                              </Space>
                            </Space>
                          </Collapse.Panel>
                        </Collapse>
                      </Card>
                    )}
                  </>
                </Row>
              </Layout.Sider>
            </Layout>
          </div>
        )}
      </Dropzone>
    </>
  )
}

export default FileExplorer
