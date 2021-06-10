import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {CMSPageContext} from '../../context'
import {RootState} from '../../store/store'
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

  const index = useSelector(({cms}: RootState) => cms.index)

  const getChildPagesFromIndex = () => {
    const slug = page.slug
    return (
      index?.pages[slug].childSlugs.map(childSlug => index.pages[childSlug]) ||
      []
    )
  }

  return (
    <CMSPageContext.Provider value={{page, getChildPagesFromIndex}}>
      {children}
    </CMSPageContext.Provider>
  )
}
