/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {RootState} from './store'

export type DataLayer = {
  pages: {
    [slug: string]: {
      typeName: string
      fields: {
        [name: string]: {
          content?: any
          blocks?: {
            [position: string]: {
              content: any
              typeName: string
            }
          }
        }
      }
    }
  }
}

export type PageIndex = {
  checksum: string
  tree: {
    id: number
    fields: {
      type: string
      slug: string
      title: string
    }
    nodes: PageIndex['tree'][]
  }
}

export interface CMSOptions {
  editing: boolean
  showMenu: boolean
  shouldOverrideWDL: boolean
}
export interface CMSState {
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
