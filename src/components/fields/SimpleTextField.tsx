/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'

import EditableField from './EditableField'

type SimpleTextFieldProps = {
  name: string
}

const SimpleTextField: React.ComponentType<SimpleTextFieldProps> = ({
  name,
  ...props
}) => <EditableField fieldOptions={{fieldName: name}} {...props} />

export default SimpleTextField
