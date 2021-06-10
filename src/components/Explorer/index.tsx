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

import {IndexKeyRefs, ChildPageTypeNamesKeyRefs} from '../Menu/utils'

const {Text} = Typography
const {Option} = Select

export type ExplorerTDN = TreeDataNode

export type PageNode = {
  key: string
  typeName?: string
  slug?: string
  title?: string
  isDraft: boolean
}

interface EditorProps {
  onNodeSave: (node: PageNode) => boolean
  onNodeDelete: (page: PageNode) => void
  indexTree: ExplorerTDN[]
  indexKeyRefs: IndexKeyRefs
  childPageTypeNamesKeyRefs: ChildPageTypeNamesKeyRefs
}

const Editor: React.FC<EditorProps> = ({
  onNodeSave,
  onNodeDelete,
  indexKeyRefs,
  indexTree,
  childPageTypeNamesKeyRefs
}) => {
  const [tree, setTree] = useState<ExplorerTDN[]>(indexTree)

  useEffect(() => {
    setTree(indexTree)
  }, [indexTree])

  const [selectedNode, setSelectedNode] = useState<PageNode>()

  const getParentKey = (key: string) => {
    let slugs = key.split('/')

    slugs.splice(slugs.length - 2, 1)

    const parentKey = slugs.join('/')

    return parentKey
  }

  const findNode = (
    tree: ExplorerTDN[],
    key: string
  ): ExplorerTDN | undefined => {
    for (const node of tree) {
      if (node.key === key) {
        return node
      }
    }

    for (const node of tree) {
      const children = node.children

      if (children) {
        return findNode(children, key)
      }
    }
  }

  const onSelect = (selectedKeys: React.Key[], _info: any) => {
    // currently only supports single select
    const keyLength = selectedKeys.length
    if (keyLength === 1) {
      const key = selectedKeys[0].toString()
      const page = indexKeyRefs[key]

      if (page) {
        const {slug, title, typeName} = page

        setSelectedNode({key, slug, title, typeName, isDraft: false})
      } else {
        setSelectedNode({
          key,
          isDraft: true,
          typeName: childPageTypeNamesKeyRefs?.[getParentKey(key)]?.[0]
        })
      }
    } else if (keyLength > 1) {
    } else {
      setSelectedNode(undefined)
    }
  }

  const onDelete = () => {
    if (selectedNode) {
      if (selectedNode.isDraft === false) {
        // call parent onNodeDelete
        onNodeDelete(selectedNode)
      } else {
        // delete from tree
        const newTree = [...tree]
        const key = selectedNode.key
        const parentKey = getParentKey(key)

        // /home/subpage/ => /home/
        const parentNode = findNode(newTree, parentKey)

        const indexToRemove = parentNode?.children?.findIndex(
          e => e.key === key
        )

        if (indexToRemove !== undefined && indexToRemove > -1) {
          parentNode?.children?.splice(indexToRemove, 1)
          setTree(newTree)
        }
      }
      setSelectedNode(undefined)
    }
  }

  const onNodeCreate = () => {
    if (selectedNode) {
      const newTree = [...tree]
      const parentNode = findNode(newTree, selectedNode.key)

      if (parentNode?.children) {
        const title = `draft-${parentNode.children.length}`
        const key = `${parentNode.key + title}/`
        parentNode?.children?.push({
          key,
          title,
          icon: <FormOutlined />,
          switcherIcon: <FormOutlined />
        })
      }

      setTree(newTree)
    }
  }

  const onSave = () => {
    if (selectedNode) {
      const {slug, title} = selectedNode

      if (slug?.trim() && title?.trim()) {
        if (onNodeSave(selectedNode)) {
        } else {
          console.error('cannot save')
        }
      } else {
        console.error('cannot save')
      }
      setSelectedNode(undefined)
    }
  }

  const childKeys =
    childPageTypeNamesKeyRefs[getParentKey(selectedNode?.key || '')]

  return (
    <>
      <Row>
        <Col span={18} push={6}>
          {selectedNode && (
            <>
              <Divider orientation="left" plain>
                Page type
              </Divider>
              {selectedNode.isDraft ? (
                <Select
                  defaultValue={selectedNode.typeName}
                  onChange={(value: any) =>
                    setSelectedNode({
                      ...selectedNode,
                      typeName: value
                    })
                  }>
                  {childKeys?.map((e, key) => (
                    <Option key={key} value={e}>
                      {e}
                    </Option>
                  ))}
                </Select>
              ) : (
                <>{selectedNode.typeName}</>
              )}

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
                  disabled={selectedNode.isDraft === false}
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
            height={400}
            showIcon={false}
            defaultExpandAll
            onSelect={onSelect}
            treeData={tree}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {selectedNode && (
          <>
            <Col span={4} push={20}>
              <Space>
                {selectedNode.key !== '/' && (
                  <Button danger type="primary" onClick={onDelete}>
                    Delete
                  </Button>
                )}
                <Button type="primary" onClick={onSave}>
                  Save
                </Button>
              </Space>
            </Col>
            <Col span={2} pull={4}>
              {selectedNode.isDraft === false &&
                childPageTypeNamesKeyRefs[selectedNode.key] && (
                  <Button onClick={onNodeCreate}>+</Button>
                )}
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default Editor
