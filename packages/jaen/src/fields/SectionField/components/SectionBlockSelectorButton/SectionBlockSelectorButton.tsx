import {Box, Flex, IconButton, Icon} from '@chakra-ui/react'
import React, {useRef, useState} from 'react'
import {FaPlus} from 'react-icons/fa'

import {
  SectionBlockSelector,
  SectionBlockSelectorProps,
  SelectorBlockType
} from '../SectionBlockSelector'

export interface SectionBlockSelectorButtonProps {
  blocks: SelectorBlockType[]
  onBlockAdd: SectionBlockSelectorProps['onBlockAdd']
  onlyAdd?: boolean
}

export const SectionBlockSelectorButton: React.FC<
  SectionBlockSelectorButtonProps
> = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleBlockAdd: SectionBlockSelectorButtonProps['onBlockAdd'] = (
    ...args
  ) => {
    props.onBlockAdd(...args)
    setIsOpen(false)
  }

  const canClose = useRef(false)

  const handleMouseLeave = () => {
    canClose.current = true
    setTimeout(() => {
      if (canClose.current) {
        setIsOpen(false)
      }
    }, 1000)
  }

  const handleMouseEnter = () => {
    canClose.current = false
  }

  return (
    <Flex
      pos="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <IconButton
        variant="jaenHighlightTooltip"
        ml={0.5}
        icon={<Icon as={FaPlus} />}
        aria-label="Add"
        onClick={toggleOpen}
      />
      {isOpen && (
        <Box position="absolute" top="6" left="0" zIndex="popover" p="2">
          <SectionBlockSelector
            sectionTitle="Add block"
            sectionDescription="Select the type of block you want to add"
            blockTypes={props.blocks}
            onBlockAdd={handleBlockAdd}
            onlyAdd={props.onlyAdd}
          />
        </Box>
      )}
    </Flex>
  )
}
