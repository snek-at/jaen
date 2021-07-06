/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {RootState, AppDispatch} from './index'

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
  deleted?: boolean
}
export type PageFieldBlock = {
  typeName: string
  fields: {
    [name: string]: string | undefined
  }
  deleted?: boolean
}

export type PageFieldBlocks = PageField['blocks']

type DataLayer = {
  rootPageSlug: string
}

export interface WorkingDataLayer extends DataLayer {
  pages: {
    [slug: string]: {
      fields: {
        [name: string]: PageField
      }
      details: PageDetails
    }
  }
}

export type WorkingDataLayerPages = WorkingDataLayer['pages']
export type WorkingDataLayerPage = WorkingDataLayerPages[string]
export type WorkingPageDetails = EditingDataLayerPage['details']

export interface EditingDataLayer extends DataLayer {
  pages: {
    [slug: string]: {
      fields: {
        [name: string]: PageField
      }
      details: Partial<PageDetails>
    }
  }
}

export interface ValuesDataLayer {
  forceUpdateTrigger: number
  checksum?: string
}

export type EditingDataLayerPages = EditingDataLayer['pages']
export type EditingDataLayerPage = EditingDataLayerPages[string]
export type EditingPageDetails = EditingDataLayerPage['details']

export interface CMSOptions {
  editing: boolean
}

export interface CMSDataLayer {
  working: WorkingDataLayer
  editing: EditingDataLayer
  values: ValuesDataLayer
}
export interface CMSState {
  settings: CMSSettings
  options: CMSOptions
  dataLayer: CMSDataLayer
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
