/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import React from 'react'
import {CMSPageContext} from '~/contexts/context'
import {PageParamsType} from '~/types'

interface IConnectedPageType {
  PageType: string
  ChildPages: ConnectedPageType[]
}

export type ConnectedPageType = React.FC & IConnectedPageType

type PageProviderProps = PageParamsType

const PageProvider: React.FC<PageProviderProps> = ({
  children,
  slug,
  typeName
}) => {
  return (
    <CMSPageContext.Provider value={{slug, typeName}}>
      {children}
    </CMSPageContext.Provider>
  )
}

export default PageProvider
