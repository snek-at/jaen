import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {CMSPageContext} from '~/contexts/context'
import {store, PageParamsType} from '~/types'

interface IConnectedPageType {
  PageParamsType: string
  ChildPages: ConnectedPageType[]
}

export type ConnectedPageType = React.FC<{slug: string}> & IConnectedPageType

type PageProviderProps = PageParamsType

const PageProvider: React.FC<PageProviderProps> = ({
  children,
  slug,
  typeName
}) => {
  const [page, _setPage] = useState<PageParamsType>({slug, typeName})

  const index = useSelector(({cms}: store.RootState) => cms.index)

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

export default PageProvider
