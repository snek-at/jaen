import {Button} from 'antd'
import React from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploadButtonProps = {
  onUpload(acceptedFiles: File[]): void
  accept?: string | string[]
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onUpload,
  accept
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: onUpload,
    noDrag: true,
    accept
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        <Button type="primary" shape="round">
          Upload file
        </Button>
      }
    </div>
  )
}

export default FileUploadButton
