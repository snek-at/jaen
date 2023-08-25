import React, {createContext, useEffect} from 'react'
import {FaCogs} from 'react-icons/fa'

import {useJaenUpdate} from '../hooks/use-jaen-update'
import {useNotificationsContext} from './notifications'

type JaenUpdateModalContextType = {
  isUpdateAvailable: boolean
  toggleModal: () => void
}

const JaenUpdateModalContext = createContext<JaenUpdateModalContextType>({
  isUpdateAvailable: false,
  toggleModal: () => {}
})

export interface JaenUpdateModalProviderProps {
  children: React.ReactNode
}

export const JaenUpdateModalProvider: React.FC<
  JaenUpdateModalProviderProps
> = ({children}) => {
  const jaenUpdate = useJaenUpdate()
  const notification = useNotificationsContext()

  const toggleModal = async () => {
    const result = await notification.confirm({
      icon: FaCogs,
      title: 'Jaen Update',
      message:
        'Update to the latest version and discard your changes or continue working on your changes.',
      confirmText: 'Update',
      cancelText: 'Later'
    })

    if (result) {
      jaenUpdate.updateToLatest()
    }
  }

  useEffect(() => {
    if (jaenUpdate.isJaenUpdate) {
      toggleModal()
    }
  }, [])

  return (
    <JaenUpdateModalContext.Provider
      value={{
        isUpdateAvailable: jaenUpdate.isJaenUpdate,
        toggleModal
      }}>
      {children}
    </JaenUpdateModalContext.Provider>
  )
}

export const useJaenUpdateModalContext = () => {
  const context = React.useContext(JaenUpdateModalContext)
  if (context === undefined) {
    throw new Error(
      'useJaenUpdateModalContext must be used within a JaenUpdateModalProvider'
    )
  }
  return context
}
