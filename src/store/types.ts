/**
 * @license
 * Copyright snek. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {RootState, AppDispatch} from './index'
export type PageIndex = any

export type CMSSettings = {gitRemote?: string}

export type PageDetails = {
  slug: string
  title: string
  childSlugs: string[]
  hiddenChildSlugs: string[]
  typeName: string
  deleted?: boolean
}

export type PagesDetails = {[slug: string]: PageDetails}

export type PageField = {
  content?: string
  blocks?: {
    [position: string]: PageFieldBlock
  }
}
export type PageFieldBlock = {
  typeName: string
  fields: {
    [name: string]: string | undefined
  }
}

export type PageFieldBlocks = PageField['blocks']

export type DataLayerPages = {
  [slug: string]: {
    fields: {
      [name: string]: PageField
    }
    details: PageDetails
  }
}

export type DataLayerPage = DataLayerPages[string]

export type DataLayer = {
  pages: DataLayerPages
  rootPageSlug: string
}

export interface CMSOptions {
  editing: boolean
}
export interface CMSState {
  settings: CMSSettings
  options: CMSOptions
  dataLayer: {
    working: DataLayer & {updateFieldsCount: number}
    editing: DataLayer
  }
  dataLayerChecksum?: string
}

export interface AuthState {
  authenticated: boolean
  loading: boolean
}

export interface NotifyState {
  error: {
    message: string
    description: string
  } | null
}
