/**
 * @license
 * Copyright Nico Schett. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type CMSComponentProps = {
  content?: string
  editable?: boolean
  editableOptions: {
    pageId: string
    pageName: string
    fieldName: string
    block?: {
      id: number
      position: number
      type: string
    }
  }
}
