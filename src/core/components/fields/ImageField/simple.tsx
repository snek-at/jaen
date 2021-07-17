/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import ImageField from '.'

type SimpleImageFieldProps = {
  name: string
}

const SimpleImageField: React.ComponentType<SimpleImageFieldProps> = ({
  name,
  ...props
}) => <ImageField fieldOptions={{fieldName: name}} {...props} />

export default SimpleImageField
