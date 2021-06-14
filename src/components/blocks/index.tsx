import * as React from 'react'

import {EditableFieldProps} from '~/components/fields'

export interface BlockFieldOptions {
  fieldName: string
  block?: {typeName: string; position: number}
}

/**
 * Block Component
 */
export interface BC<T>
  extends React.FC<{
    fieldOptions: BlockFieldOptions
  }> {
  BlockType: string
  BlockFields: {
    [name in keyof T]: React.ComponentType<EditableFieldProps>
  }
}

export type GenericBC = BC<{
  [name: string]: React.ComponentType<EditableFieldProps>
}>

export function prepareBlocks<T>(
  Block: BC<T>,
  fieldOptions: BlockFieldOptions
) {
  type keys = keyof typeof Block.BlockFields
  const blockFieldNames = Object.keys(Block.BlockFields) as keys[]

  return blockFieldNames.map(blockFieldName => {
    const Field = Block.BlockFields[
      blockFieldName
    ] as React.ComponentType<EditableFieldProps>
    console.log(blockFieldName)

    if (fieldOptions.block) {
      const ConfiguredField = (
        <Field
          fieldOptions={{
            ...fieldOptions,
            block: {
              ...fieldOptions.block,
              blockFieldName: blockFieldName as string
            }
          }}
        />
      )

      return {ConfiguredField, blockFieldName}
    }
    throw new Error(
      `Cannot prepareBlocks for ${
        Block.BlockType
      } with following fieldOptions: ${JSON.stringify(fieldOptions)}`
    )
  })
}
