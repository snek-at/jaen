/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

type CMSPagesDataState = {
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

export type CMSState = {
  editingMode: boolean
  original: CMSPagesDataState
  edited: CMSPagesDataState
}
