import ipfsClient from 'ipfs-http-client'

const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

export const upload = async (payload: any) => {
  const {cid} = await ipfs.add(payload)
  return `https://cloudflare-ipfs.com/ipfs/${cid.toString()}`
}
