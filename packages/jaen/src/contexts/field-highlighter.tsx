import {HStack} from '@chakra-ui/react'
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef
} from 'react'

import {createPortal} from 'react-dom'

export const FIELD_HIGHLIGHTER_CLASSNAMES = {
  JAEN_HIGHLIGHT_FRAME: 'jaen-highlight-frame',
  JAEN_HIGHLIGHT_TOOLTIP: 'jaen-highlight-tooltip'
}

export interface FieldHighlighterProviderContextValue {
  ref: (
    ref: HTMLDivElement | null,
    id: string,
    actions: React.ReactNode[]
  ) => void
}

export const FieldHighlighterProviderContext =
  createContext<FieldHighlighterProviderContextValue>({
    ref: () => {}
  })

export interface HighlightProviderProps {
  theme: Record<string, unknown>
  children: React.ReactNode
}

interface TooltipProps {
  actions: React.ReactNode[]
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  // const jaenTheme = useJaenTheme()

  return (
    <HStack
      ref={ref}
      id="coco"
      w="fit-content"
      mt="-6"
      p="1"
      mx="auto"
      justifyContent="center"
      spacing="1"
      pointerEvents="all">
      {/* <Button size="xs" colorScheme="blackAlpha">
      Edit block
    </Button> */}
      {props.actions.map((action, index) => (
        <React.Fragment key={index}>{action}</React.Fragment>
      ))}
    </HStack>
  )
})

export const FieldHighlighterProvider: React.FC<
  HighlightProviderProps
> = props => {
  const itemsRef = useRef<{
    [id: string]: {
      ref: HTMLDivElement | null
      tooltipButtons: React.ReactNode[]
    }
  }>({})

  const tooltipHightRef = useRef<HTMLDivElement | null>(null)

  let resizeObserver = useRef<ResizeObserver | null>(null)

  const setHighlight = (element: HTMLElement) => {
    const appRoot = document.getElementById('___gatsby')

    if (!appRoot) {
      alert('appRoot root not found, please contact support')
      return
    }

    // let highlighterRoot: HTMLDivElement | null = appRoot.querySelector(
    //   `.${CLASSNAMES.JAEN_HIGHLIGHT}`
    // )

    let frameRoot: HTMLDivElement | null = appRoot.querySelector(
      `.${FIELD_HIGHLIGHTER_CLASSNAMES.JAEN_HIGHLIGHT_FRAME}`
    )

    if (frameRoot) {
      frameRoot.remove()
    }

    frameRoot = appRoot.appendChild(document.createElement('div'))
    frameRoot.classList.add(FIELD_HIGHLIGHTER_CLASSNAMES.JAEN_HIGHLIGHT_FRAME)

    // include scroll
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    frameRoot.style.position = 'absolute'

    const tooltipRoot = frameRoot.appendChild(document.createElement('div'))

    tooltipRoot.classList.add(
      FIELD_HIGHLIGHTER_CLASSNAMES.JAEN_HIGHLIGHT_TOOLTIP
    )

    tooltipRoot.style.position = 'sticky'

    // move tooltip above element
    tooltipRoot.style.top = `3.5rem`

    tooltipRoot.style.pointerEvents = 'none'
    tooltipRoot.style.zIndex = '999'

    tooltipRoot.tabIndex = -1

    if (resizeObserver.current) {
      resizeObserver.current.disconnect()
    }

    // Positions
    // add a observer to the frameRoot to re-position it when the element moves or resizes
    resizeObserver.current = new ResizeObserver(entries => {
      const entry = entries[0]

      if (!entry) return

      const elementRect = entry.target.getBoundingClientRect()

      if (!frameRoot)
        throw new Error('elementRect is null. This should not happen.')

      // frameRoot exists because we just created it
      frameRoot.style.top = `${elementRect.top + scrollTop}px`
      frameRoot.style.left = `${elementRect.left + scrollLeft}px`
      frameRoot.style.width = `${elementRect.width}px`
      frameRoot.style.height = `${elementRect.height}px`

      tooltipRoot.style.width = '100%'
    })

    resizeObserver.current.observe(element)

    const item = Object.values(itemsRef.current).find(
      item => item.ref === element
    )

    spawnTooltip(item?.tooltipButtons)
  }

  const findClosestParentMatching = (
    element: HTMLElement,
    find: (element: HTMLElement) => boolean
  ) => {
    let currentElement: HTMLElement | null = element
    let index = -1

    while (currentElement) {
      index++
      if (find(currentElement)) {
        return {element: currentElement, index}
      }

      currentElement = currentElement.parentElement
    }

    return null
  }

  const mouseEnterHandler = useCallback((e: MouseEvent) => {
    const element = e.target as HTMLElement

    element.focus({
      preventScroll: true
    })
  }, [])

  const mouseLeaveHandler = useCallback((e: MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement

    const nextItem = Object.values(itemsRef.current).find(
      item => item.ref === relatedTarget
    )

    if (nextItem) {
      nextItem?.ref?.focus({
        preventScroll: true
      })
    } else {
      const closestParent = findClosestParentMatching(relatedTarget, element =>
        Object.values(itemsRef.current).some(item => item.ref === element)
      )

      if (closestParent) {
        const closestItem = Object.values(itemsRef.current).find(
          item => item.ref === closestParent.element
        )

        closestItem?.ref?.focus({
          preventScroll: true
        })
      }
    }
  }, [])

  const focusHandler = useCallback((e: FocusEvent) => {
    const element = e.target as HTMLElement

    // set the cursor to the end of the element if it is a contenteditable element
    if (element.isContentEditable) {
      const range = document.createRange()
      const selection = window.getSelection()

      if (!selection) return

      range.selectNodeContents(element)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    setHighlight(element)
  }, [])

  const blurHandler = useCallback((e: FocusEvent) => {
    const highlightRoot = document.querySelector(
      `.${FIELD_HIGHLIGHTER_CLASSNAMES.JAEN_HIGHLIGHT_FRAME}`
    )

    if (!highlightRoot) return

    // Check if the blur event is caused by a click on the tooltip
    // check if tooltip ref contains relatedTarget

    if (tooltipHightRef.current?.contains(e.relatedTarget as Node)) {
      return
    }

    const element = e.currentTarget as HTMLElement

    // Do not remove the highlight if the new focus is on a child of the original element
    if (element?.contains(e.relatedTarget as Node)) {
      return
    }

    // check if relatedTarget is the the highlight tooltip
    if (highlightRoot.contains(e.relatedTarget as Node)) {
      return
    }

    highlightRoot.remove()
  }, [])

  const ref = useCallback(
    (
      ref: HTMLDivElement | null,
      id: string,
      tooltipButtons: React.ReactNode[]
    ) => {
      if (ref) {
        if (itemsRef.current[id]) {
          const oldRef = itemsRef.current[id]?.ref

          if (oldRef) {
            // remove old event listeners
            oldRef.removeEventListener('mouseenter', mouseEnterHandler)
            oldRef.removeEventListener('mouseleave', mouseLeaveHandler)
            oldRef.removeEventListener('focus', focusHandler)
            oldRef.removeEventListener('blur', blurHandler)
          }
        }

        itemsRef.current[id] = {ref, tooltipButtons}

        ref.addEventListener('mouseenter', mouseEnterHandler)
        ref.addEventListener('mouseleave', mouseLeaveHandler)
        ref.addEventListener('focus', focusHandler)
        ref.addEventListener('blur', blurHandler)
      }
    },
    [
      // itemsRef.current,
      mouseEnterHandler,
      mouseLeaveHandler,
      focusHandler,
      blurHandler
    ]
  )

  const [portaledTooltip, setPortaledTooltip] = React.useState<JSX.Element>()

  const spawnTooltip = useCallback((tooltipButtons: React.ReactNode[] = []) => {
    const tooltipRoot = document.querySelector(
      `.${FIELD_HIGHLIGHTER_CLASSNAMES.JAEN_HIGHLIGHT_TOOLTIP}`
    )

    if (!tooltipRoot) return

    const portal = createPortal(
      <Tooltip actions={tooltipButtons} ref={tooltipHightRef} />,
      tooltipRoot
    )

    setPortaledTooltip(portal)

    return () => {
      setPortaledTooltip(undefined)
    }
  }, [])

  return (
    <FieldHighlighterProviderContext.Provider value={{ref}}>
      {portaledTooltip}
      {props.children}
    </FieldHighlighterProviderContext.Provider>
  )
}

export interface UseHighlightProps {
  tooltipButtons: React.ReactNode[]
}

export const useHighlight = ({tooltipButtons}: UseHighlightProps) => {
  const {ref} = useContext(FieldHighlighterProviderContext)

  const refOnly = useCallback(
    (theRef: HTMLDivElement | null, id: string) => {
      ref(theRef, id, tooltipButtons)
    },
    [tooltipButtons, ref]
  )

  return {
    ref: refOnly
  }
}

export default FieldHighlighterProvider
