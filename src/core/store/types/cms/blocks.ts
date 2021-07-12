export type TextBlock = {
  _type: 'TextBlock'
  text: string
}
export type ImageBlock = {
  _type: 'ImageBlock'
  src: string
  title: string
  description: string
}

export type ContentBlocks = TextBlock | ImageBlock

export type CustomBlock = {
  typeName: string
  fields: {
    [name: string]: ContentBlocks
  }
  deleted?: boolean
}
