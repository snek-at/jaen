import {FileAddFilled} from '@ant-design/icons'
import {Row, Divider, Layout, Menu} from 'antd'
import {useState} from 'react'
import {useDropzone} from 'react-dropzone'

import FileUploadButton from '~/components/FileUploadButton'

import FileCollection, {FileItem} from './FileCollection'
import './fileexplorer.scss'

type FileExplorerProps = {
  onUpload(acceptedFiles: File[]): void
  items: FileItem[]
}

const FileExplorer: React.FC<FileExplorerProps> = ({onUpload, items}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: onUpload
  })

  const [uploading] = useState(false)

  const [view, setView] = useState<'IMAGES' | 'VIDEOS' | 'DOCUMENTS'>('IMAGES')

  // eslint-disable-next-line no-console
  console.log(uploading, isDragActive, view, setView)

  return (
    <>
      <div
        {...getRootProps({
          onClick: event => event.stopPropagation()
        })}>
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="dropzone-overlay">
            <div className="text">
              <FileAddFilled />
            </div>
          </div>
        )}

        <Layout>
          <Layout.Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%'}}>
              <Row justify="center">
                <FileUploadButton onUpload={onUpload} />
              </Row>
              <Divider plain orientation="left">
                Media
              </Divider>
              <Menu.Item key="1" onClick={() => setView('IMAGES')}>
                Images
              </Menu.Item>
              <Menu.Item key="2" onClick={() => setView('VIDEOS')}>
                Videos
              </Menu.Item>
              <Divider plain orientation="left">
                Other
              </Divider>
              <Menu.Item key="3" onClick={() => setView('DOCUMENTS')}>
                Documents
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            {view === 'IMAGES' && <FileCollection items={items} />}
            {view === 'VIDEOS' && <FileCollection items={[]} />}
            {view === 'DOCUMENTS' && <FileCollection items={items} />}
          </Layout.Content>
        </Layout>
      </div>
    </>
  )
}

export default FileExplorer
