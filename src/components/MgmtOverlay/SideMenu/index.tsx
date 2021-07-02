import React from 'react'

import SMI from '../SideMenuItem'
import './sidemenu.scss'

type SideMenuProps = {
  items: {
    text: string
    icon: JSX.Element
    onClick: () => void
    renderElementOnClick?: JSX.Element
  }[]
}

const SideMenu: React.FC<SideMenuProps> = ({items}) => {
  return (
    <div className="sidemenu">
      {items.map((item, key) => (
        <SMI key={key} id={key} {...item} />
      ))}
    </div>
  )
}

export default SideMenu
