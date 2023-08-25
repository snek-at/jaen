import {As, Box, BoxProps} from '@chakra-ui/react'
import React, {forwardRef, useCallback, useMemo} from 'react'

import {useHighlight} from '../../../contexts/field-highlighter'

export interface HighlightTooltipProps extends Omit<BoxProps, 'children'> {
  id: string
  children?:
    | React.ReactNode
    | ((props: {
        ref: (node: HTMLDivElement) => void
        tabIndex?: number
      }) => React.ReactNode)
  as?: As
  asAs?: As
  actions: React.ReactNode[]
  isEditing?: boolean
}

export const HighlightTooltip = forwardRef<
  HTMLDivElement,
  HighlightTooltipProps
>(({id, actions, as, asAs, isEditing, children, ...props}, ref) => {
  const {ref: highlightRef} = useHighlight({tooltipButtons: actions})

  const setRefs = useCallback(
    (node: HTMLDivElement) => {
      // handle ref and highlightRef

      if (typeof ref === 'function') {
        ref(node)
      } else {
        if (ref) ref.current = node
      }

      highlightRef(node, id)
    },
    [ref, highlightRef, id]
  )

  const Wrapper = as || Box

  const memoedChildren = useMemo(() => {
    if (typeof children === 'function') {
      return children({ref: setRefs, tabIndex: isEditing ? 1 : undefined})
    }

    return children
  }, [setRefs, isEditing, children])

  if (typeof children === 'function') {
    return (
      <Wrapper
        {...props}
        as={asAs}
        id={id}
        _focus={{
          outline: 'none'
        }}>
        {memoedChildren}
      </Wrapper>
    )
  }

  return (
    <Wrapper
      {...props}
      ref={setRefs}
      as={asAs}
      id={id}
      tabIndex={isEditing ? 1 : undefined}
      _focus={{
        outline: 'none'
      }}>
      {memoedChildren}
    </Wrapper>
  )
})
