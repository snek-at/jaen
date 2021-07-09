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
