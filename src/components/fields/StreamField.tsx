import {AppstoreAddOutlined} from '@ant-design/icons'
import {Menu, Row, Button, Col, Dropdown, Divider} from 'antd'
import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useCMSPageContext} from '~/contexts/context'
import {store} from '~/types'

import cssVariables from '~/common/css/variables.module.scss'

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
  })

  const editing = useSelector(({cms}: store.RootState) => cms.options.editing)

  const storeBlocks = useSelector(pageFieldBlocksSelector(slug, name))

  const blocksKeys = Object.keys(storeBlocks || {}).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  const getBlockComponentByTypeName = (typeName: string) =>
    blocks.find(b => b.BlockType === typeName)

  const renderBlock = (position: number) => {
    const blockTypeName = storeBlocks?.[position].typeName

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
                block: {position, typeName: Block.BlockType}
              }}
            />
          ) : null}
        </>
      )
    }
  }

  const addNewBlock = (typeName: string) =>
    dispatch(
      registerField({
        page,
        fieldOptions: {
          fieldName: name,
          block: {
            position: reverseOrder ? blocksKeys.length : -blocksKeys.length,
            typeName: typeName
          }
        }
      })
    )

  const blocksTypes = blocks.map(block => block.BlockType)

  const AddBlockMenu = (
    <Menu
      onClick={(value: any) => {
        addNewBlock(blocksTypes[value.key])
      }}>
      {blocksTypes.map((typeName, key) => (
        <Menu.Item key={key}>{typeName}</Menu.Item>
      ))}
    </Menu>
  )

  const BlockEditMenu = (position: string) => (
    <Menu>
      <Menu.Item
        danger
        onClick={() => {
          dispatch(
            unregisterField({
              page: page,
              fieldOptions: {
                fieldName: name,
                block: {
                  position: parseInt(position),
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

  const buttonStyle = {color: 'white', backgroundColor: cssVariables.snekGreen}
  const button = (
    <Row justify="center">
      {blocksTypes.length > 1 ? (
        <Dropdown.Button
          icon={<AppstoreAddOutlined />}
          overlay={AddBlockMenu}
          buttonsRender={([_leftButton, rightButton]) => [
            undefined,
            React.cloneElement(rightButton as any, {
              style: buttonStyle
            })
          ]}
        />
      ) : (
        <Button
          style={buttonStyle}
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
