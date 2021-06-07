import {CMSState} from '../store/types'
import type {SkeletonPageProps} from './pages/index'

export interface FieldOptions {
  page: SkeletonPageProps
  name: string
  block?: {typeName: string; position: number}
}

export interface CMSEditableProps {
  editable: boolean
  workingLayer: CMSState['dataLayer']['working']
}
