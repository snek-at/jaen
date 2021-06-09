import {FormOutlined} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Row,
  Tree,
  TreeDataNode,
  Input,
  Select,
  Typography,
  Space
} from 'antd'
import React, {useState, useEffect} from 'react'

import {PageIndex} from '../../store/types'

const {Text} = Typography
const {Option} = Select

type IndexKeyRefs = {[key: string]: PageIndex['tree']}

interface EditorProps {
  onNodeSave: () => void
  onNodeDelete: () => void
  indexTree: TreeDataNode[]
  indexKeyRefs: IndexKeyRefs
}

const Editor: React.FC<EditorProps> = ({
  onNodeSave,
  onNodeDelete,
  indexKeyRefs,
  indexTree
}) => {
  const [tree, setTree] = useState<TreeDataNode[]>(indexTree)

  useEffect(() => {
    setTree(indexTree)
  }, [indexTree])

  const [selectedNode, setSelectedNode] =
    useState<{
      key: string
      typeName?: string
      slug?: string
      title?: string
      isDraft: boolean
    }>()

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info)

    // currently only supports single select
    const keyLength = selectedKeys.length
    if (keyLength === 1) {
      const key = selectedKeys[0].toString()
      const page = indexKeyRefs[key]

      if (page) {
        const {slug, title, type} = page.fields

        setSelectedNode({key, slug, title, typeName: type, isDraft: false})
      } else {
        setSelectedNode({key, isDraft: true})
      }
    } else if (keyLength > 1) {
    } else {
      setSelectedNode(undefined)
    }
  }

  const onNodeCreate = () => {
    console.log('create node on ', selectedNode)

    const findNode = (tree: TreeDataNode[], key: string) => {
      for (const node of tree) {
        if (node.key === key) {
          return node
        }

        const children = node.children

        if (children) {
          findNode(children, key)
        }
      }
    }

    if (selectedNode) {
      const newTree = {...tree}
      const parentNode = findNode(newTree, selectedNode.key)

      if (parentNode?.children) {
        const title = `draft-${parentNode.children.length}`
        const key = `${parentNode.key + title}/`
        parentNode?.children?.push({key, title, icon: <FormOutlined />})
      }

      setTree(newTree)
    }
  }

  return (
    <>
      <Row>
        <Col span={18} push={6}>
          {selectedNode && (
            <>
              <Divider orientation="left" plain>
                Page type
              </Divider>
              <Select
                value={selectedNode.typeName}
                // defaultValue={selectedNode.pageType}
                onChange={(value: any) => console.log(value)}>
                <Option value="HomePage">HomePage</Option>
                <Option value="TestPage">TestPage</Option>
              </Select>
              <Divider orientation="left" plain>
                Properties
              </Divider>

              <Space>
                <Input
                  prefix={<Text strong>Slug</Text>}
                  onChange={value =>
                    setSelectedNode({
                      ...selectedNode,
                      slug: value.target.value
                    })
                  }
                  value={selectedNode.slug}
                />
                <Input
                  prefix={<Text strong>Title</Text>}
                  onChange={value =>
                    setSelectedNode({
                      ...selectedNode,
                      title: value.target.value
                    })
                  }
                  value={selectedNode.title}
                />
              </Space>
            </>
          )}
        </Col>
        <Col span={6} pull={18}>
          <Tree
            showLine
            showIcon={false}
            defaultExpandedKeys={['/']}
            onSelect={onSelect}
            treeData={tree}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={4} push={20}>
          <Button danger type="primary" onClick={onNodeDelete}>
            Delete
          </Button>
          <Button type="primary" onClick={onNodeSave}>
            Save
          </Button>
        </Col>
        <Col span={2} pull={4}>
          {!selectedNode?.isDraft && <Button onClick={onNodeCreate}>+</Button>}
        </Col>
      </Row>
    </>
  )
}

export default Editor
