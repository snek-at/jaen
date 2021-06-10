import React, {createContext} from 'react'

import {SkeletonPageType} from './components/pages'

export type CMSContextType = {
  registeredPages: SkeletonPageType[]
  setRegisteredPages: React.Dispatch<React.SetStateAction<SkeletonPageType[]>>
  getRegisteredPage: (typeName: string) => SkeletonPageType | undefined
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined)
