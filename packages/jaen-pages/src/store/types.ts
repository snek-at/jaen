import {DeepPartial} from '@reduxjs/toolkit'

import {SiteRoutingSpecs, SiteType} from '../types'

///#region > States
export interface SiteState extends DeepPartial<SiteType> {
  routing: SiteRoutingSpecs
}

export type OptionsState = {
  isEditing: boolean
}

export type SFState = {
  initBackendLink?: string
}
//#endregion
