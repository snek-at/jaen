// Updated URL to reflect its purpose as a storage service endpoint
const STORAGE_URL = 'https://osg.snek.at/storage'

interface UploadedFileData {
  data: {
    file_id: string
    file_name: string
    file_size: number
    file_unique_id: string
    mime_type: string
    thumb?: {
      file_id: string
      file_size: number
      file_unique_id: string
      height: number
      width: number
    }
  }
  fileUrl: string
  fileThumbUrl?: string
}

/**
 * Uploads a file to the storage service.
 *
 * @param fileData - The file payload as a JSON object, Blob, or File.
 * @param filename - (Optional) The name of the file to be uploaded. Default: 'jaen-index.json'.
 * @returns A Promise that resolves to an object containing the uploaded file's data and the URL of the uploaded file.
 */
export const uploadFile = async (
  fileData: object | Blob | File,
  filename: string = 'jaen-index.json'
): Promise<UploadedFileData> => {
  const formData = new FormData()

  // Convert payload to Blob if it's not already a Blob or File
  if (fileData instanceof Blob || fileData instanceof File) {
    formData.append('file', fileData)
  } else {
    formData.append(
      'file',
      new File([JSON.stringify(fileData)], filename, {
        type: 'application/json'
      })
    )
  }

  const resp = await fetch(STORAGE_URL, {
    body: formData,
    method: 'POST'
  })

  const data = await resp.json()
  const fileUrl = `${STORAGE_URL}/${data.file_id}`
  const fileThumbUrl = data.thumb?.file_id
    ? `${STORAGE_URL}/${data.thumb.file_id}`
    : undefined

  return {data, fileUrl, fileThumbUrl}
}

/**
 * Uploads a file to the storage service from a Node.js environment.
 *
 * @param options - An object containing the file payload and optional filename.
 * @param options.payload - The file payload as a string (in Node.js).
 * @param options.fileName - (Optional) The name of the file to be uploaded. Default: 'jaen-index.json'.
 * @returns A Promise that resolves to an object containing the uploaded file's data and the URL of the uploaded file.
 */
export const uploadFileFromNode = async (options: {
  payload: string
  fileName?: string
}): Promise<UploadedFileData> => {
  const FormData = (await import('form-data')).default
  const form = new FormData({
    maxDataSize: 20971520
  })

  form.append('file', options.payload, {
    filename: options.fileName || 'jaen-index.json'
  })

  // Here we create and await our promise:
  return await new Promise<UploadedFileData>((resolve, reject) => {
    form.submit(
      STORAGE_URL,
      (
        err: any,
        res: {
          setEncoding: (arg0: string) => void
          on: (
            arg0: string,
            arg1: {(chunk: any): void; (err: any): void}
          ) => void
        }
      ) => {
        if (err) {
          reject(err)
        }

        let responseData = ''
        res.setEncoding('utf8')
        res.on('data', chunk => {
          responseData += chunk
        })

        res.on('end', () => {
          const data = JSON.parse(responseData)
          const fileUrl = `${STORAGE_URL}/${data.file_id}`
          const fileThumbUrl = data.thumb?.file_id
            ? `${STORAGE_URL}/${data.thumb.file_id}`
            : undefined

          resolve({data, fileUrl, fileThumbUrl})
        })

        res.on('error', err => {
          reject(err)
        })
      }
    )
  })
}
