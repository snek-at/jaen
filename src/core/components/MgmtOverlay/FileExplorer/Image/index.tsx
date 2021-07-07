import React, {memo} from 'react'

import {FileItem} from '../FileCollection'

type ImageProps = FileItem &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >

const Image: React.FC<ImageProps> = ({src, title, description, ...props}) => {
  return (
    <>
      <img src={src} title={title} alt={description} {...props} />
    </>
  )
}

export default memo(Image)
