/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import PdfField from '.'

type SimpleImageFieldProps = {
  name: string
}

const SimplePdfField: React.ComponentType<SimpleImageFieldProps> = ({
  name,
  ...props
}) => <PdfField fieldOptions={{fieldName: name}} {...props} />

export default SimplePdfField
