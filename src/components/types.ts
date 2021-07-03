/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {store} from '~/types'

export type {ExplorerTDN, PageNode} from './Explorer'
export interface EditableFieldOptions {
  fieldName: string
  block?: {typeName: string; position: number; blockFieldName: string}
}

export interface CMSEditableProps {
  editable: boolean
  workingLayer: store.CMSState['dataLayer']['working']
}
