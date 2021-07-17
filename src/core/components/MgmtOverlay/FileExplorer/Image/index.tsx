/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React, {memo} from 'react'

type ImageProps = {src: string} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

const Image: React.FC<ImageProps> = ({src, title, alt, ...props}) => {
  return (
    <>
      <img src={src} title={title} alt={alt} {...props} />
    </>
  )
}

export default memo(Image)
