/**
 * @license
 * Copyright snek-at. All Rights Reserved.
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */

export type {ConnectedPageType} from './contexts/pageProvider'
export type {BC} from './components/blocks'

export * as store from './store/types'
export * as components from './components/types'

export type PageParamsType = {slug: string; typeName: string}
