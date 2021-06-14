import {store} from '~/types'

export type {ExplorerTDN} from './Explorer'

export interface EditableFieldOptions {
  fieldName: string
  block?: {typeName: string; position: number; blockFieldName: string}
}

export interface CMSEditableProps {
  editable: boolean
  workingLayer: store.CMSState['dataLayer']['working']
}
