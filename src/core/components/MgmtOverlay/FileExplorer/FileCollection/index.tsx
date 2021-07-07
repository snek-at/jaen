import {DeleteTwoTone, EyeTwoTone} from '@ant-design/icons'
import {Space, Button, Card, Collapse, Layout, Row, Typography} from 'antd'
import {useState} from 'react'

import Image from '../Image'
import './filecollection.scss'

const {Content, Sider} = Layout
const {Panel} = Collapse
const {Text} = Typography
export type FileItem = {title: string; src: string; description: string}

export type FileCollectionProps = {
  items: FileItem[]
  // onPreview???
}

const FileCollection: React.FC<FileCollectionProps> = ({items}) => {
  const [activeItem, setActiveItem] = useState<FileItem>(items[0])

  const onActivePreview = (): void => {
    alert('preview')
  }
  const onActiveDelete = (): void => {
    alert('delete')
  }

  // eslint-disable-next-line no-console
  console.log('activeitem', !!activeItem)

  return (
    <Layout className="layout">
      <Content
        className="content"
        onClick={event => {
          event.preventDefault()
          if (event.target === event.currentTarget) {
            setActiveItem(items[0])
          }
        }}>
        {items.length === 0 ? (
          <div className="dropzone">
            <span>{"Drag 'n' drop some files here"}</span>
          </div>
        ) : (
          items.map((item, key) => (
            <Image
              key={key}
              className={activeItem === item ? 'active' : ''}
              onDoubleClick={onActivePreview}
              onClick={() => {
                if (activeItem === item) {
                  setActiveItem(items[0])
                } else {
                  setActiveItem(item)
                }
              }}
              {...item}
            />
          ))
        )}
      </Content>
      <Sider width={350} className="sider">
        <Row justify="center">
          {activeItem && (
            <>
              <Card
                hoverable
                style={{width: 350}}
                cover={
                  <img
                    alt={activeItem.description}
                    src={activeItem.src}
                    style={{objectFit: 'contain', height: '25rem'}}
                  />
                }>
                <Collapse defaultActiveKey={['1', '2']} ghost>
                  <Panel header="Details" key="1">
                    <Text strong>Title: </Text>
                    <Text
                      editable={{
                        onChange: value =>
                          setActiveItem({...activeItem, title: value})
                      }}>
                      {activeItem.title}
                    </Text>

                    <br />

                    <Text strong>Des: </Text>
                    <Text
                      editable={{
                        onChange: value =>
                          setActiveItem({...activeItem, description: value})
                      }}>
                      {activeItem.description}
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
            </>
          )}
        </Row>
      </Sider>
    </Layout>
  )
}

export default FileCollection
