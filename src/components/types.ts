import {store} from '~/types'

export type {ExplorerTDN} from './Explorer'

export interface FieldOptions {
  name: string
  block?: {typeName: string; position: number}
}

export interface CMSEditableProps {
  editable: boolean
  workingLayer: store.CMSState['dataLayer']['working']
}
