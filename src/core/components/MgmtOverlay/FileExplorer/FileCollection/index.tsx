import {DeleteTwoTone, EyeTwoTone, LoadingOutlined} from '@ant-design/icons'
import {Space, Button, Card, Collapse, Layout, Row, Typography} from 'antd'
import {useState} from 'react'
import {Document, Page} from 'react-pdf'

import {FileInfo} from '~/store/types'

import Image from '../Image'
import './filecollection.scss'

const {Content, Sider} = Layout
const {Panel} = Collapse
const {Text} = Typography

export type CollectionFile = {index: string} & FileInfo

export type FileCollectionProps = {
  files: CollectionFile[]
  onFileUpdate?: (index: string, meta: FileInfo['meta']) => void
  onFileDelete?: (index: string) => void
  onFilePreview?: (index: string) => void
}

const FileCollection: React.FC<FileCollectionProps> = ({
  onFileUpdate,
  onFileDelete,
  onFilePreview,
  files
}) => {
  const [selectedFile, setSelectedFile] = useState<CollectionFile | null>(null)

  const onActiveUpdate = (updateMeta: FileInfo['meta']): void => {
    if (selectedFile) {
      const meta = {
        ...selectedFile.meta,
        ...updateMeta
      }

      setSelectedFile({...selectedFile, meta})

      if (onFileUpdate) {
        onFileUpdate(selectedFile.index, meta)
      }
    }
  }

  const onActivePreview = (): void => {
    if (onFilePreview && selectedFile) {
      onFilePreview(selectedFile.index)
    }
  }

  const onActiveDelete = (): void => {
    if (onFileDelete && selectedFile) {
      onFileDelete(selectedFile.index)

      setSelectedFile(null)
    }
  }

  return (
    <Layout className="layout">
      <Content
        className="content"
        onClick={event => {
          event.preventDefault()

          if (event.target === event.currentTarget) {
            setSelectedFile(null)
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
                  className={selectedFile?.index === file.index ? 'active' : ''}
                  onDoubleClick={onActivePreview}
                  onClick={() => {
                    if (selectedFile?.index !== file.index) {
                      setSelectedFile(file)
                    }
                  }}
                  src={file.url}
                  title={file.meta?.title}
                  alt={file.meta?.description}
                />
              )}
              {file.meta.fileType === 'application/pdf' && (
                <div
                  onDoubleClick={onActivePreview}
                  onClick={() => {
                    if (selectedFile?.index !== file.index) {
                      setSelectedFile(file)
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
      <Sider width={350} className="sider">
        <Row justify="center">
          <>
            {selectedFile && (
              <Card
                hoverable
                style={{width: 350}}
                cover={
                  <>
                    {selectedFile.meta.fileType?.startsWith('image') && (
                      <Image
                        alt={selectedFile.meta.description}
                        src={selectedFile.url}
                        style={{objectFit: 'contain', height: '25rem'}}
                      />
                    )}
                    {selectedFile.meta.fileType === 'application/pdf' && (
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
                  <Panel header="Details" key="1">
                    <Text strong>Title: </Text>
                    <Text
                      editable={{
                        onChange: value => onActiveUpdate({title: value})
                      }}>
                      {selectedFile.meta.title}
                    </Text>

                    <br />

                    <Text strong>Des: </Text>
                    <Text
                      editable={{
                        onChange: value => onActiveUpdate({description: value})
                      }}>
                      {selectedFile.meta.description}
                    </Text>
                  </Panel>
                  <Panel header="Actions" key="2">
                    <Space>
                      <Button shape="round" onClick={onActivePreview}>
                        <EyeTwoTone />
                        Preview
                      </Button>
                      <Button shape="round" onClick={onActiveDelete}>
                        <DeleteTwoTone />
                        Delete
                      </Button>
                    </Space>
                  </Panel>
                </Collapse>
              </Card>
            )}
          </>
        </Row>
      </Sider>
    </Layout>
  )
}

export default FileCollection
