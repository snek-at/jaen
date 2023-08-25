import React, {createContext, useContext, useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid' // Import uuid to generate unique IDs
import {MediaNode} from '../types'

// Define the context type
type MediaModalContextType = {
  isOpen: boolean
  MediaModalComponent: React.LazyExoticComponent<any>
  toggleModal: (args?: {
    jaenPageId?: string
    isSelector?: boolean
    id?: string
    defaultSelected?: string
  }) => void
}

// Create the initial context with default values
const MediaModalContext = createContext<MediaModalContextType>({
  isOpen: false,
  MediaModalComponent: undefined as any,
  toggleModal: () => {}
})

export interface MediaModalProviderProps {
  MediaModalComponent: React.LazyExoticComponent<any>
  children: React.ReactNode
}

// Define the MediaModalProvider component
export const MediaModalProvider: React.FC<MediaModalProviderProps> = ({
  MediaModalComponent,
  children
}) => {
  const [open, setOpen] = useState<{
    isOpen: boolean
    isSelector: boolean
    id: string
    defaultSelected?: string
    jaenPageId?: string
  }>({
    isOpen: false,
    isSelector: false,
    id: 'default'
  })

  const toggleModal = (args?: {
    isSelector?: boolean
    id?: string
    defaultSelected?: string
    jaenPageId?: string
  }) => {
    setOpen({
      isOpen: !open.isOpen,
      isSelector: !!args?.isSelector,
      id: args?.id || 'default',
      defaultSelected: args?.defaultSelected,
      jaenPageId: args?.jaenPageId
    })
  }

  const handleSelect = (mediaNode: MediaNode) => {
    const onSelectEvent = new CustomEvent('mediaNodeSelected', {
      detail: {
        mediaNode,
        uniqueId: open.id
      }
    })
    window.dispatchEvent(onSelectEvent)
  }

  return (
    <MediaModalContext.Provider
      value={{
        MediaModalComponent,
        isOpen: open.isOpen,
        toggleModal
      }}>
      {open.isOpen && (
        <React.Suspense>
          <MediaModalComponent
            onSelect={handleSelect}
            isSelector={open.isSelector}
            defaultSelected={open.defaultSelected}
            jaenPageId={open.jaenPageId}
          />
        </React.Suspense>
      )}
      {children}
    </MediaModalContext.Provider>
  )
}

export interface UseMediaModalArgs {
  jaenPageId?: string
  onSelect?: (mediaNode: MediaNode) => void
}

export const useMediaModal = (args?: UseMediaModalArgs) => {
  const context = useContext(MediaModalContext) as MediaModalContextType
  if (!context) {
    throw new Error('useMediaModal must be used within a MediaModalProvider')
  }

  const [uniqueId] = useState<string>(uuidv4())

  useEffect(() => {
    if (!args?.onSelect) return

    const onSelectHandler: EventListener = (event: CustomEvent) => {
      // Check if the event is the 'mediaNodeSelected' event
      if (
        event.type === 'mediaNodeSelected' &&
        event.detail.uniqueId === uniqueId
      ) {
        const selectedMediaNode = event.detail.mediaNode
        // Call the onSelect callback with the selected media node

        args?.onSelect?.(selectedMediaNode)

        context.toggleModal()
      }
    }

    // Add event listener to capture the 'mediaNodeSelected' event
    window.addEventListener('mediaNodeSelected', onSelectHandler)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mediaNodeSelected', onSelectHandler)
    }
  }, [context.toggleModal])

  if (!context) {
    throw new Error('useMediaModal must be used within a MediaModalProvider')
  }

  return {
    toggleModal: (options?: {defaultSelected?: string}) =>
      context.toggleModal({
        id: uniqueId,
        isSelector: !!args?.onSelect,
        defaultSelected: options?.defaultSelected,
        jaenPageId: args?.jaenPageId
      }),
    isOpen: context.isOpen
  }
}
