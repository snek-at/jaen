/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {BifrostBridge} from '@schettnet/bridge'
import BridgeDrop from 'drop'

BridgeDrop.bridge = new BifrostBridge({
  httpUrl: 'https://origin.snek.at/graphql'
})

export const BridgeSession = BridgeDrop.bridge.session
