import React, {useState} from 'react'

import {CMSPageContext} from '../../context'
import {PageType} from '../types'

interface IConnectedPageType {
  PageType: string
  ChildPages: ConnectedPageType[]
}

export type ConnectedPageType = React.FC<{slug: string}> & IConnectedPageType
export type PageProviderProps = PageType

export const PageProvider: React.FC<PageProviderProps> = ({
  children,
  slug,
  typeName
}) => {
  const [page, _setPage] = useState<PageType>({slug, typeName})

  return (
    <CMSPageContext.Provider value={{page}}>{children}</CMSPageContext.Provider>
  )
}
