import {Button} from 'antd'
import React from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploadButtonProps = {
  onUpload(acceptedFiles: File[]): void
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({onUpload}) => {
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: onUpload,
    noDrag: true
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
