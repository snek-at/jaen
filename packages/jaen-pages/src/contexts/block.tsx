import {BlockIdentifier} from '@src/types'
import {createContext, useContext} from 'react'
import * as React from 'react'

export interface BlockContextType {
  containerName: string // name of the container
  blockName: string // type of the block e.g 'SampleBlock'
  position: number // position of the block inside a container
}

export const BlockContext = createContext<BlockContextType | undefined>(
  undefined
)

export const useBlockContext = (): BlockContextType => {
  const context = useContext(BlockContext)

  if (context === undefined) {
    throw new Error('useBlockContext must be within BlockContext')
  }

  return context
}

/**
 *
 * @param fieldName This name is used to identify the field in the block,
 *                  and changed to container name
 * @returns {fieldName: string; block: BlockIdentifier | undefined} The identifier of the block or undefined if not in a block context
 */
export const useBlock = (
  fieldName: string
): {updatedFieldName: string; block: BlockIdentifier | undefined} => {
  let block: BlockIdentifier | undefined = undefined

  try {
    const {containerName, blockName, position} = useBlockContext()

    block = {
      typeName: blockName,
      position,
      blockFieldName: fieldName
    }

    return {updatedFieldName: containerName, block}
  } catch {
    return {updatedFieldName: fieldName, block: undefined}
  }
}

export const BlockProvider: React.FC<BlockContextType> = ({
  children,
  ...props
}) => {
  return (
    <BlockContext.Provider value={{...props}}>{children}</BlockContext.Provider>
  )
}

export default BlockProvider
