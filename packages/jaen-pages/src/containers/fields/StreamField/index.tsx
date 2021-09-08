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
import {BlockItem, GenericBC, prepareBlocks} from '@containers/blocks'
import {useTemplate} from '@contexts/template'
import {RevertCSSWrapper} from '@snek-at/jaen'
import {SFWrapper} from '@snek-at/jaen-shared-ui'
import {BlocksField} from '@src/types'
import {useAppDispatch, useAppSelector, useAppState} from '@store/index'
import {pageFieldBlocksSelector} from '@store/selectors/pages'
import {withRedux} from '@store/withRedux'
import React, {useEffect, useState, useRef, useMemo} from 'react'
import {useCallback} from 'react'

type StreamFieldProps = {
  fieldName: string
  blocks: GenericBC[]
  reverseOrder?: boolean
}

const StreamField: React.FC<StreamFieldProps> = ({
  fieldName,
  blocks,
  reverseOrder
}) => {
  const dispatch = useAppDispatch()

  const {jaenPageContext} = useTemplate()
  const pageId = jaenPageContext.id

  const contextValue = (jaenPageContext.fields?.[fieldName] as BlocksField)
    ?.blocks

  const SFBlocks = useAppSelector(
    pageFieldBlocksSelector(pageId, fieldName),
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
          fieldName,
          block: {
            position,
            typeName
          }
        }
      })
    )
  }

  const deleteBlock = useCallback((position: string) => {
    const payload = {
      pageId,
      field: {
        fieldName,
        block: {
          position: parseInt(position)
        }
      }
    }
    // check if position is in contextValue or initValue, if not, unregister it instead of deleting it
    if (position in contextValue) {
      dispatch(deletePageField(payload))
    } else {
      dispatch(unregisterPageField(payload))
    }
  }, [])

  const blocksTypes = blocks.map(block => ({
    id: block.BlockType,
    name: block.BlockType,
    onClick: () => addBlock(block.BlockType)
  }))

  const getBlockComponentByTypeName = (
    typeName: string
  ): GenericBC | undefined => blocks.find(b => b.BlockType === typeName)

  const renderedBlocks = visibleBlocksKeys.map(position => {
    const BlockComponent = getBlockComponentByTypeName(
      allBlocks?.[position].typeName
    )

    if (BlockComponent) {
      const block = {
        position: parseInt(position),
        typeName: BlockComponent.BlockType
      }

      return (
        <BlockItem
          key={position}
          position={position}
          fieldName={fieldName}
          Block={BlockComponent}
          block={block}
          initValue={allBlocks[position]}
          height={height}
          width={width}
          onDelete={deleteBlock}
          isEditing={isEditing}
        />
      )
    }
  })

  if (isEditing) {
    return (
      <SFWrapper ref={ref} fieldName={fieldName} blockTypes={blocksTypes}>
        {renderedBlocks}
      </SFWrapper>
    )
  }

  return <RevertCSSWrapper>{renderedBlocks}</RevertCSSWrapper>
}

export default withRedux(StreamField)
