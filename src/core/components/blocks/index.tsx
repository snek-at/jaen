/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
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
    streamFieldHeight: number
    streamFieldWidth: number
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

type MappingType<T> = {[name in keyof T]: JSX.Element}

export function prepareBlocks<T>(
  Block: BC<T>,
  fieldOptions: BlockFieldOptions
): MappingType<T> {
  type keys = keyof typeof Block.BlockFields
  const blockFieldNames = Object.keys(Block.BlockFields) as keys[]

  const mapping: MappingType<T> = {} as MappingType<T>

  for (const blockFieldName of blockFieldNames) {
    const Field: React.ComponentType<EditableFieldProps> =
      Block.BlockFields[blockFieldName]

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

      mapping[blockFieldName] = ConfiguredField
    }
  }

  return mapping
}
