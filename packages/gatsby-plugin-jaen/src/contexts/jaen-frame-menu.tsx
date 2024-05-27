import {createContext, useContext, useState, useMemo} from 'react'

import {NavigationGroupsProps} from '../components/JaenFrame/components/NavigationGroups'
import {NavigationItem} from '../components/JaenFrame/components/NavigationGroups/NavigationGroups'
import {MenuButtonProps} from '../components/shared/MenuButton'

// Define the context type
type JaenFrameMenuContextType = {
  menu: {
    app: NavigationGroupsProps['groups']
    user: NavigationGroupsProps['groups']
  }
  extendMenu: (
    type: 'app' | 'user',
    menu: {
      group: string
      label?: string
      items: {[itemId: string]: NavigationItem}
    }
  ) => void

  addMenu: {
    items: MenuButtonProps['items']
  }

  extendAddMenu: (items: MenuButtonProps['items']) => void
}

// Create the context
const JaenFrameMenuContext = createContext<
  JaenFrameMenuContextType | undefined
>(undefined)

export const useJaenFrameMenuContext = () => {
  const context = useContext(JaenFrameMenuContext)
  if (!context) {
    throw new Error(
      'useJaenFrameMenuContext must be used within JaenFrameMenuProvider'
    )
  }
  return context
}

export const JaenFrameMenuProvider: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  const [menu, setMenu] = useState<JaenFrameMenuContextType['menu']>({
    app: {},
    user: {}
  })

  const [addMenu, setAddMenu] = useState<JaenFrameMenuContextType['addMenu']>({
    items: {}
  })

  const extendMenu = (
    type: 'app' | 'user',
    menu: {
      group: string
      label: string
      items: {[itemId: string]: NavigationItem}
    }
  ) => {
    setMenu(prev => {
      return {
        ...prev,
        [type]: {
          ...prev[type],
          [menu.group]: {
            ...prev[type]?.[menu.group],
            ...(menu.label ? {label: menu.label} : {}),
            items: {
              ...prev[type]?.[menu.group]?.items,
              ...menu.items
            }
          }
        }
      }
    })
  }

  const extendAddMenu = (items: MenuButtonProps['items']) => {
    setAddMenu(prev => {
      return {
        ...prev,
        items: {
          ...prev.items,
          ...items
        }
      }
    })
  }

  const contextValue = useMemo(
    () => ({menu, extendMenu, addMenu, extendAddMenu}),
    [menu, extendMenu, addMenu, extendAddMenu]
  )

  return (
    <JaenFrameMenuContext.Provider value={contextValue}>
      {children}
    </JaenFrameMenuContext.Provider>
  )
}
