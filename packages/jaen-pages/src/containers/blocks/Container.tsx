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
  deletePageField,
  registerPageField,
  unregisterPageField
} from '@actions/siteActions'
import {merge} from '@common/utils'
import {useTemplate} from '@contexts/template'
import {RevertCSSWrapper} from '@snek-at/jaen'
import {SFWrapper, SFBWrapper} from '@snek-at/jaen-shared-ui'
import BlockProvider from '@src/contexts/block'
import {BlocksField, JaenBlock} from '@src/types'
import {useAppDispatch, useAppSelector} from '@store/index'
import {pageFieldBlocksSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import React, {useEffect, useState, useRef, useMemo} from 'react'
import {useCallback} from 'react'

type BlockContainerProps = {
  name: string
  displayName: string
  blocks: JaenBlock[]
  reverseOrder?: boolean
}

const BlockContainer: React.FC<BlockContainerProps> = ({
  name,
  displayName,
  blocks,
  reverseOrder
}) => {
  const dispatch = useAppDispatch()

  const {jaenPageContext} = useTemplate()
  const pageId = jaenPageContext.id

  const contextValue = (jaenPageContext.fields?.[name] as BlocksField)?.blocks

  const SFBlocks = useAppSelector(
    pageFieldBlocksSelector(pageId, name),
    (l, r) => {
      const shouldUpdate =
        JSON.stringify(Object.keys(l)) !== JSON.stringify(Object.keys(r))

      if (shouldUpdate) {
        return false
      }

      for (const key in l) {
        if (l[key].deleted !== r[key].deleted) {
          return false
        }
      }

      return true
    }
  )

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight)
      setWidth(ref.current.clientWidth)
    }
  }, [ref.current?.clientHeight, ref.current?.clientWidth])

  const isEditing = useAppSelector(state => state.options.isEditing)

  const visibleBlocks = useMemo(
    () =>
      merge(contextValue, SFBlocks, value => value.deleted) as typeof SFBlocks,
    [contextValue, SFBlocks]
  )

  const allBlocks = useMemo(
    () => merge(contextValue, SFBlocks) as typeof SFBlocks,
    [contextValue, SFBlocks]
  )

  const visibleBlocksKeys = Object.keys(visibleBlocks).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  const allBlocksKeys = Object.keys(allBlocks).sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  const addBlock = (typeName: string): void => {
    let position
    if (allBlocksKeys.length > 0) {
      position = Math.min(...allBlocksKeys.map(e => parseInt(e)))
    } else {
      position = 0
    }

    if (reverseOrder) {
      position++
    } else {
      position--
    }

    dispatch(
      registerPageField({
        pageId,
        field: {
          fieldName: name,
          block: {
            position,
            typeName
          }
        }
      })
    )
  }

  const deleteBlock = useCallback((position: number) => {
    const payload = {
      pageId,
      field: {
        fieldName: name,
        block: {
          position
        }
      }
    }

    // check if position is in contextValue, if not, unregister it instead of deleting it
    if (contextValue && position in contextValue) {
      dispatch(deletePageField(payload))
    } else {
      dispatch(unregisterPageField(payload))
    }
  }, [])

  const blocksTypes = blocks.map(block => ({
    id: block.BlockName,
    name: block.BlockName,
    onClick: () => addBlock(block.BlockName)
  }))

  const getBlockComponentByTypeName = (
    typeName: string
  ): JaenBlock | undefined => blocks.find(b => b.BlockName === typeName)

  const renderedBlocks = visibleBlocksKeys.map(position => {
    const BlockComponent = getBlockComponentByTypeName(
      allBlocks?.[position].typeName
    )

    const numPosition = parseInt(position)

    if (BlockComponent) {
      const block = (
        <BlockProvider
          key={position}
          containerName={name}
          position={numPosition}
          blockName={BlockComponent.BlockName}>
          {!isEditing ? <BlockComponent /> : <BlockComponent />}
        </BlockProvider>
      )

      if (isEditing) {
        return (
          <SFBWrapper onDeleteClick={() => deleteBlock(numPosition)}>
            {block}
          </SFBWrapper>
        )
      }

      return block
    }
  })

  console.log('ADJAKDAJKD', React.Children.toArray(renderedBlocks))

  if (isEditing) {
    return (
      <SFWrapper ref={ref} displayName={displayName} blockTypes={blocksTypes}>
        {renderedBlocks}
      </SFWrapper>
    )
  }

  return <>{renderedBlocks}</>
}

export default withRedux(BlockContainer)
