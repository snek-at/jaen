/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Typography} from 'antd'
import React, {useState} from 'react'

import './sidemenuitem.scss'

type MenuItemProps = {
  id: number
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>
  onClick: () => void
  renderElementOnClick?: JSX.Element
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  text,
  Icon,
  onClick,
  renderElementOnClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showElement, setShowElement] = useState(false)

  const icon = (
    <Icon
      style={{
        fontSize: '120%',
        display: 'inline-block',
        verticalAlign: 'middle',
        color: isExpanded ? 'green' : 'black'
      }}
    />
  )

  return (
    <>
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !showElement && setIsExpanded(false)}
        onClick={() => {
          onClick()
          renderElementOnClick && setShowElement(!showElement)
        }}
        className="sidemenu-item"
        style={{
          top: `${id * 4 + 4}rem`,
          borderRadius: isExpanded ? '75px 75px' : '50%',
          width: isExpanded ? 'auto' : 50,
          height: 50,
          padding: '0.75rem',
          verticalAlign: 'middle',
          textAlign: 'center'
        }}>
        {isExpanded ? (
          <>
            {icon}
            <Typography.Text style={{padding: '0 1em 0 1em'}}>
              {text}
            </Typography.Text>
          </>
        ) : (
          <>{icon}</>
        )}
      </div>
      {showElement && renderElementOnClick}
    </>
  )
}

export default MenuItem
