import {CMSState} from '../store/types'

export interface FieldOptions {
  name: string
  block?: {typeName: string; position: number}
}

export interface CMSEditableProps {
  editable: boolean
  workingLayer: CMSState['dataLayer']['working']
}
