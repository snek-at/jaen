import {RecursivePartial} from '~/common/utils'

import * as blocks from './blocks'

export type BlocksField = {
  _type: 'BlocksField'
  blocks: {
    [position: string]: blocks.CustomBlock
  }
  deleted?: boolean
}

export type PlainField = {
  _type: 'PlainField'
  content: blocks.ContentBlocks
}

export type Field = PlainField | BlocksField

export type BaseDataLayer = {
  rootPageSlug: string
  pages: {
    [slug: string]: {
      fields: {
        [name: string]: Field
      }
      details: {
        slug: string
        title: string
        childSlugs: string[]
        hiddenChildSlugs: string[]
        typeName: string
        deleted?: boolean
      }
    }
  }
  files: {
    [index: string]: {
      url: string
      meta: Partial<{
        fileType: string
        title: string
        description: string
      }>
      /**
       * Contains a list of fieldNames that uses a specifc image
       */
      refs: string[]
      deleted?: boolean
    }
  }
}

export type EditingDataLayer = RecursivePartial<BaseDataLayer>

export type WorkingDataLayer = Omit<BaseDataLayer, 'files'> & {
  crypt: {
    cipher?: string
    clear?: {
      files: BaseDataLayer['files']
    }
  }
}

export type ValuesDataLayer = {
  forceUpdateTrigger: number
  checksum?: string
}

export type DataLayer = {
  editing: EditingDataLayer
  working: WorkingDataLayer
  values: ValuesDataLayer
}

// Defining types for better usage
export type BlocksFieldBlocks = BlocksField['blocks']

export type PageDetails = BaseDataLayer['pages'][string]['details']
export type PagesDetails = {[slug: string]: PageDetails}
export type DataLayerFiles = BaseDataLayer['files']

export type EditingDataLayerPages = EditingDataLayer['pages']
export type WorkingDataLayerPages = WorkingDataLayer['pages']

export type FileInfo = DataLayerFiles[string]

// Other types used in actions etc.
type BlocksFieldDetails = {
  _type: 'BlocksField'
  blockFieldName: string
  blockPosition: number
}

type PlainFieldDetails = {
  _type: 'PlainField'
}

export type FieldUpdateDetails = (PlainFieldDetails | BlocksFieldDetails) & {
  fieldName: string
  block: blocks.ContentBlocks
}
