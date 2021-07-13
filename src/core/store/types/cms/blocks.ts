export type TextBlock = {
  _type: 'TextBlock'
  text: string
}
export type FileBlock = {
  _type: 'FileBlock'
  /**
   * Reference to a DataLayerFiles[string] object
   */
  index: string
}

export type ContentBlocks = TextBlock | FileBlock

export type CustomBlock = {
  typeName: string
  fields: {
    [name: string]: ContentBlocks
  }
  deleted?: boolean
}
