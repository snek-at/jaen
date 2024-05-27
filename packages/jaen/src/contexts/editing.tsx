import {createContext, useContext} from 'react'

export interface EditingContextProps {
  isEditing: boolean
}

export const EditingContext = createContext<EditingContextProps | null>(null)

/**
 * This provider is used to set to control the editing state of the
 * fields of its children.
 */
export const EditingProvider: React.FC<{
  children: React.ReactNode
  isEditing: boolean
}> = ({children, isEditing}) => {
  return (
    <EditingContext.Provider value={{isEditing}}>
      {children}
    </EditingContext.Provider>
  )
}

export const useEditingContext = () => {
  const context = useContext(EditingContext)

  if (!context)
    throw new Error('useEditingContext must be used within a EditingProvider')

  return context
}
