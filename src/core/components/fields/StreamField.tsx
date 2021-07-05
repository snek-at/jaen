/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {AppstoreAddOutlined} from '@ant-design/icons'
import {Menu, Row, Button, Col, Dropdown, Divider} from 'antd'
import {isEqual} from 'lodash'
import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {store} from '~/types'

import {useCMSPageContext} from '~/contexts/context'

import {registerField, unregisterField} from '~/store/actions/cms'
import {pageFieldBlocksSelector} from '~/store/selectors/cms'

import {GenericBC} from '../blocks'
import './fields.scss'

type StreamFieldProps = {
  name: string
  blocks: GenericBC[]
  reverseOrder?: boolean
}

const StreamField: React.FC<StreamFieldProps> = ({
  name,
  blocks,
  reverseOrder
}) => {
  const {slug, typeName} = useCMSPageContext()
  const page = {slug, typeName}
  const dispatch = useDispatch<store.AppDispatch>()

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight)
      setWidth(ref.current.clientWidth)
    }
  }, [ref.current?.clientHeight, ref.current?.clientWidth])

  const editing = useSelector(({cms}: store.RootState) => cms.options.editing)

  const storeBlocks = useSelector(
    pageFieldBlocksSelector(slug, name),
    (l, r) => {
      if (l && r) {
        if (isEqual(Object.keys(l), Object.keys(r))) {
          return true
        }
      }

      return false
    }
  )

  const blocksKeys = Object.keys(storeBlocks || {}).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  const getBlockComponentByTypeName = (
    _typeName: string
  ): GenericBC | undefined => blocks.find(b => b.BlockType === _typeName)

  const renderBlock = (_position: number): JSX.Element | undefined => {
    const blockTypeName = storeBlocks?.[_position].typeName

    if (blockTypeName) {
      const Block = getBlockComponentByTypeName(blockTypeName)

      return (
        <>
          {Block ? (
            <Block
              streamFieldHeight={height}
              streamFieldWidth={width}
              fieldOptions={{
                fieldName: name,
                block: {position: _position, typeName: Block.BlockType}
              }}
            />
          ) : null}
        </>
      )
    }
  }

  const addNewBlock = (_typeName: string): void => {
    dispatch(
      registerField({
        page,
        fieldOptions: {
          fieldName: name,
          block: {
            position: reverseOrder ? blocksKeys.length : -blocksKeys.length,
            typeName: _typeName
          }
        }
      })
    )
  }

  const blocksTypes = blocks.map(block => block.BlockType)

  const AddBlockMenu = (
    <Menu
      onClick={value => {
        addNewBlock(blocksTypes[parseInt(value.key)])
      }}>
      {blocksTypes.map((_typeName, key) => (
        <Menu.Item key={key}>{_typeName}</Menu.Item>
      ))}
    </Menu>
  )

  const BlockEditMenu = (_position: string): JSX.Element => (
    <Menu>
      <Menu.Item
        danger
        onClick={() => {
          dispatch(
            unregisterField({
              page,
              fieldOptions: {
                fieldName: name,
                block: {
                  position: parseInt(_position),
                  typeName: ''
                }
              }
            })
          )
        }}>
        Delete
      </Menu.Item>
    </Menu>
  )

  const button = (
    <Row justify="center">
      {blocksTypes.length > 1 ? (
        <Dropdown.Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          overlay={AddBlockMenu}
          buttonsRender={([_leftButton, rightButton]) => [
            undefined,
            React.cloneElement(rightButton as never, {
              className: 'streamfield-add-button'
            })
          ]}
        />
      ) : (
        <Button
          type="primary"
          className="streamfield-add-button"
          icon={<AppstoreAddOutlined />}
          onClick={() => addNewBlock(blocksTypes[0])}
        />
      )}
    </Row>
  )
  return (
    <div ref={ref}>
      {editing && !reverseOrder && (
        <>
          {button}
          <Divider orientation="left" />
        </>
      )}
      {storeBlocks && (
        <Row>
          <Col>
            {blocksKeys.map((position, key) => (
              <Dropdown
                key={key}
                disabled={!editing}
                overlay={BlockEditMenu(position)}
                trigger={['contextMenu']}>
                <div>{renderBlock(parseInt(position))}</div>
              </Dropdown>
            ))}
          </Col>
        </Row>
      )}
      {editing && reverseOrder && (
        <>
          <Divider orientation="left" />
          {button}
        </>
      )}
    </div>
  )
}

export default StreamField
