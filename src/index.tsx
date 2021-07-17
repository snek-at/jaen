/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import ReactDOM from 'react-dom'

import {CMSProvider} from './core'
import {HomePage} from './examples/pages'
import ImprintPage from './examples/pages/Imprint'

ReactDOM.render(
  <CMSProvider
    settings={{gitRemote: 'snek-shipyard/jaen-demo'}}
    pages={[HomePage, ImprintPage]}
  />,
  document.getElementById('root')
)
