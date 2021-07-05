/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {ConnectedPageType, SimpleTextField} from '~/index'

const ImprintPage: ConnectedPageType = () => {
  return (
    <div style={{marginLeft: 100, marginRight: 100}}>
      <SimpleTextField name="content"></SimpleTextField>
    </div>
  )
}

ImprintPage.PageType = 'ImprintPage'
ImprintPage.ChildPages = []

export default ImprintPage
