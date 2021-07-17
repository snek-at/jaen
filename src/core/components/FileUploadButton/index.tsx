/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
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
