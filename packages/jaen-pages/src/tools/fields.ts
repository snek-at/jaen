import {BlocksField, Field, FieldIdentifier, PlainField} from '../types'

export const getFieldContent = (
  field: Field,
  block: FieldIdentifier['block']
) => {
  if (block) {
    return (field as BlocksField | undefined)?.blocks?.[block.position]
  }

  return (field as PlainField | undefined)?.content
}
