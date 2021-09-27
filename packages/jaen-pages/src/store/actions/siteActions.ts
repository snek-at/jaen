import {DeepPartial} from '@chakra-ui/react'
import {createAction} from '@reduxjs/toolkit'
import {
  FieldIdentifier,
  FieldUpdateDetails,
  PageType,
  ReturnResolveDynamicPaths,
  SitePages,
  SiteType
} from '@src/types'

export type UpdateSiteMetaActionPayload = {
  meta: SiteType['siteMetadata']
}
export const updateSiteMeta = createAction<UpdateSiteMetaActionPayload>(
  'site/updateSiteMeta'
)

export type AddPageActionPayload = {
  pageId: string
  // page: Omit<PageType, 'pageMetadata'> & {
  //   pageMetadata: {
  //     title: string
  //   }
  // }
  page: DeepPartial<PageType>
  nodes: SitePages['nodes']
}
export const addPage = createAction<AddPageActionPayload>('site/addPage')

export const deletePage = createAction<string>('site/deletePage')

export type MovePageActionPayload = {
  sourceId: string
  destinationId: string | null
  nodes: SitePages['nodes']
}
export const movePage = createAction<MovePageActionPayload>('site/movePage')

export type UpdatePageActionPayload = {
  pageId: string
  slug?: string
  meta: Partial<PageType['pageMetadata']>
}
export const updatePage = createAction<UpdatePageActionPayload>(
  'site/updatePage'
)

export type RegisterPageFieldActionPayload = {
  pageId: string
  field: {
    fieldName: string
    block?: {
      typeName: string
      position: number
      blockFieldName?: string
    }
  }
}
export const registerPageField = createAction<RegisterPageFieldActionPayload>(
  'site/registerPageField'
)

export type UnregisterPageFieldActionPayload = {
  pageId: string
  field: {
    fieldName: string
    block?: {
      position: number
      blockFieldName?: string
    }
  }
}
export const unregisterPageField = createAction<UnregisterPageFieldActionPayload>(
  'site/unregisterPageField'
)

export type DeletePageFieldActionPayload = {
  pageId: string
  field: {
    fieldName: string
    block?: {
      position: number
      blockFieldName?: string
    }
  }
}
export const deletePageField = createAction<DeletePageFieldActionPayload>(
  'site/deletePageField'
)

export type UpdatePageFieldActionPayload = {
  pageId: string
  fieldDetails: FieldUpdateDetails
}
export const updatePageField = createAction<UpdatePageFieldActionPayload>(
  'site/updatePageField'
)

export const discardSiteChanges = createAction('site/discardSiteChanges')

export type UpdateSiteRoutingActionPayload = {
  dynamicPaths: ReturnResolveDynamicPaths
}
export const updateSiteRouting = createAction<UpdateSiteRoutingActionPayload>(
  'site/updateSiteRouting'
)
