import {BifrostBridge} from '@schettnet/bridge'
import BridgeDrop, {references} from 'drop'

BridgeDrop.bridge = new BifrostBridge({
  httpUrl: 'http://localhost:8000/graphql/'
})

export const switchBridge = (urls: {httpUrl: string; wssUrl?: string}) =>
  (BridgeDrop.bridge = new BifrostBridge(urls))

export const BridgeSession = BridgeDrop.bridge.session
export const DropAPI = BridgeDrop.buildIn
export const DropAPIReferences: any = references
