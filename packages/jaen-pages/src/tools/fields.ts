import {BlockIdentifier, BlocksField, Field, PlainField} from '../types'

export const getFieldContent = (
  field: Field,
  block: BlockIdentifier | undefined
) => {
  if (block) {
    return (field as BlocksField | undefined)?.blocks?.[block.position]?.fields?.[block.blockFieldName]
  }

  return (field as PlainField | undefined)?.content
}
