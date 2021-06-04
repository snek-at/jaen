import {SkeletonPageProps} from './pages/index'

export type FieldOptions = {
  page: SkeletonPageProps
  name: string
  block?: {typeName: string; position: number}
}

export interface CMSEditableProps {
  editable: boolean
}
