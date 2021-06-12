import {BifrostBridge} from '@schettnet/bridge'
import BridgeDrop from 'drop'

BridgeDrop.bridge = new BifrostBridge({
  httpUrl: 'https://origin.snek.at/graphql'
})

export const BridgeSession = BridgeDrop.bridge.session
