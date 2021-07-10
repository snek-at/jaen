/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import '@draft-js-plugins/image/lib/plugin.css'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'
import '@draft-js-plugins/linkify/lib/plugin.css'
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft'
import {pdfjs} from 'react-pdf'

import '~/common/css/base.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export type {BC, ConnectedPageType} from '~/types'

export {prepareBlocks} from './components/blocks'
export {
  EditableField,
  RichTextField,
  SimpleTextField,
  SimpleRichTextField,
  IndexField,
  StreamField
} from './components/fields'
export {CMSProvider} from './contexts'
