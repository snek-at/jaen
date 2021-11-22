export const upload = async (
  payload: object | Blob | File,
  backend: 'IPFS' | 'OSG' = 'OSG'
) => {
  if (backend === 'IPFS') {
    const ipfsClient = await import('ipfs-http-client')

    const ipfs = ipfsClient.create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https'
    })

    const {cid} = await ipfs.add(
      typeof payload === 'object' ? JSON.stringify(payload) : payload
    )
    return `https://cloudflare-ipfs.com/ipfs/${cid.toString()}`
  } else {
    const url = 'https://osg.snek.at/storage'

    const formData = new FormData()

    // payload to blob
    if (payload instanceof Blob || payload instanceof File) {
      formData.append('file', payload)
    } else {
      formData.append(
        'file',
        new File([JSON.stringify(payload)], 'jaen-index.json', {
          type: 'application/json'
        })
      )
    }

    const resp = await fetch(url, {
      body: formData,
      method: 'POST'
    })

    const json = await resp.json()

    return `${url}/${json.file_id}`
  }
}
