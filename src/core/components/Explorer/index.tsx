/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {FormOutlined, SelectOutlined} from '@ant-design/icons'
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
import {useHistory} from 'react-router'

import {deepSearch} from '~/common/utils'

import {IndexKeyRefs, ChildPageTypeNamesKeyRefs} from '~/utils/pageTree'

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
  const history = useHistory()
  const [tree, setTree] = useState<ExplorerTDN[]>(indexTree)

  useEffect(() => {
    setTree(indexTree)
  }, [indexTree])

  const [selectedNode, setSelectedNode] = useState<PageNode>()

  const getParentKey = (key: string): string => {
    const slugs = key.split('/')

    slugs.splice(slugs.length - 2, 1)

    const parentKey = slugs.join('/')

    return parentKey
  }

  const onSelect = (selectedKeys: React.Key[], _info: unknown): void => {
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
      // For later multi select
    } else {
      setSelectedNode(undefined)
    }
  }

  const onDelete = (): void => {
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
        const parentNode = deepSearch(
          newTree,
          'key',
          (_k: string, v: unknown) => v === parentKey
        ) as ExplorerTDN

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

  const onNodeCreate = (): void => {
    if (selectedNode) {
      const newTree = [...tree]

      const parentNode = deepSearch(
        newTree,
        'key',
        (_k: string, v: unknown) => v === selectedNode.key
      ) as ExplorerTDN

      if (parentNode?.children) {
        const title = `draft-${parentNode.children.length}`
        const key = `${parentNode.key}${title}/`
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

  const onSave = (): void => {
    if (selectedNode) {
      const {slug, title} = selectedNode

      if (slug?.trim() && title?.trim()) {
        if (onNodeSave(selectedNode)) {
          // Successful save -> Handle later
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
                  onChange={(value: string) =>
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
              <Divider orientation={'left'} plain>
                Actions
              </Divider>
              <Button
                type="link"
                shape="circle"
                icon={<SelectOutlined />}
                onClick={() => history.push(selectedNode.key)}
              />
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
      <Row>
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
