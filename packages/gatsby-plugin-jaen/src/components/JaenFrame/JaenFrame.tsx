import React from 'react'

import {Toolbar} from '../Toolbar'

import {Link} from 'gatsby'
import {cn} from '../../lib/utils'
import {JaenLogo} from '../shared/JaenLogo/JaenLogo'
import {MenuButtonProps} from '../shared/MenuButton/MenuButton'
import {
  Breadcrumbs,
  BreadcrumbsProps
} from './components/Breadcrumbs/Breadcrumbs'
import {DrawerLeft, DrawerLeftProps} from './components/DrawerLeft/DrawerLeft'
import {
  DrawerRight,
  DrawerRightProps
} from './components/DrawerRight/DrawerRight'

export interface JaenFrameProps {
  logo?: JSX.Element
  navigation: {
    isStickyDisabled?: boolean
    app: {
      navigationGroups: DrawerLeftProps['navigationGroups']
      version: DrawerLeftProps['version']
      logo: DrawerLeftProps['logo']
    }
    user: {
      user: DrawerRightProps['user']
      navigationGroups: DrawerRightProps['navigationGroups']
      isBadgeVisible: DrawerRightProps['isBadgeVisible']
    }
    addMenu: {
      items: MenuButtonProps['items']
    }
    breadcrumbs: {
      links: BreadcrumbsProps['links']
    }
  }
}

export const JaenFrame: React.FC<JaenFrameProps> = React.memo(props => {
  return (
    <header
      className={cn(
        'flex h-16 px-4 border-b border-border backdrop-blur-sm justify-between gap-8 z-40  bg-white',
        {
          'sticky top-0': !props.navigation.isStickyDisabled
        }
      )}>
      <div className="flex gap-4 my-auto">
        <DrawerLeft
          navigationGroups={props.navigation.app.navigationGroups}
          version={props.navigation.app.version}
          logo={props.navigation.app.logo}
        />

        <Breadcrumbs links={props.navigation.breadcrumbs.links} />
      </div>

      <Link className="flex-1 max-w-xs no-underline" to="/">
        {props.logo || <JaenLogo />}
      </Link>

      <div className="flex my-auto gap-4">
        <Toolbar />

        <DrawerRight
          user={props.navigation.user.user}
          navigationGroups={props.navigation.user.navigationGroups}
          isBadgeVisible={props.navigation.user.isBadgeVisible}
        />
      </div>
    </header>
  )
})

export default JaenFrame
