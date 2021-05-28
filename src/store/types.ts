/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
export type CMSField = {
  type: 'FIELD'
  pageId: string
  pageName: string
  fieldName: string
  content: string
}

export type CMSBlock = {
  type: 'BLOCK'
  pageId: string
  pageName: string
  fieldName: string
  blockType: string
  blockPosition: number
  blockId: number
  content: string
}

export type CMSMenuIndex = {
  checksum: string
  tree: {
    id: number
    fields: {
      type: string
      slug: string
      title: string
    }
    nodes: CMSMenuIndex['tree'][]
  }
}

export type CMSMenuState = {
  index?: CMSMenuIndex
}

export type CMSState = {
  authenticated: boolean
  editingMode: boolean
  showMenu: boolean
  menu: CMSMenuState
  pages: {
    [CMSPageId: string]: {
      id: string
      name: string
      serverContent?: any
      page: {
        blocks?: {
          [CMSBlockId: string]: CMSBlock
        }
        fields?: {
          [CMSFieldId: string]: CMSField
        }
      }
    }
  }
}
