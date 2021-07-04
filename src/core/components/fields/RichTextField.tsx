/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'

import EditableField, {OwnProps as RichTextFieldProps} from './EditableField'

const RichTextField: React.ComponentType<RichTextFieldProps> = props => (
  <EditableField
    buttonOptions={{
      bold: true,
      italic: true,
      underline: true,
      code: true,
      headlineOne: true,
      headlineTwo: true,
      headlineThree: true,
      unorderedList: true,
      orderedList: true,
      blockquote: true,
      codeBlock: true
    }}
    {...props}
  />
)

export default RichTextField
