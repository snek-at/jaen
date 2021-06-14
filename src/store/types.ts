/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {RootState, AppDispatch} from './store'

export type CMSSettings = {gitRemote?: string}

export type DataLayer = {
  pages: {
    [slug: string]: {
      typeName: string
      fields: {
        [name: string]: {
          content?: string
          blocks?: {
            [position: string]: {
              typeName: string
              fields: {
                [name: string]: string | undefined
              }
            }
          }
        }
      }
      hiddenChildSlugs: string[]
    }
  }
}

export type PageIndex = {
  checksum: string
  rootPageSlug: string
  pages: {
    [slug: string]: {
      slug: string
      title: string
      typeName: string
      childSlugs: string[]
    }
  }
}

export interface CMSOptions {
  editing: boolean
  showMenu: boolean
  shouldOverrideWDL: boolean
}
export interface CMSState {
  settings: CMSSettings
  index?: PageIndex
  options: CMSOptions
  dataLayer: {
    origCksm?: string
    working: DataLayer & {updateFieldsCount: number}
    editing: DataLayer
  }
}

export interface AuthState {
  authenticated: boolean
}
