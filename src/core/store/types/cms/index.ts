import * as blocks from './blocks'
import * as dataLayer from './dataLayer'

export {blocks, dataLayer}

type CMSState = {
  settings: {
    gitRemote?: string
  }
  options: {
    editing: boolean
  }
  dataLayer: dataLayer.DataLayer
}

export default CMSState
