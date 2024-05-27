// @ts-nocheck

import {Box, Progress} from '@chakra-ui/react'
import {useEffect, useState} from 'react'

import {Graph} from './Graph'

export const PageVisualizer = props => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Box
      h="md"
      overflow="hidden"
      w="full"
      border="solid 1px"
      borderColor="border.emphasized"
      borderRadius="lg">
      <Box boxSize="full" pos="relative">
        {isMounted ? (
          <Graph tree={props.tree} selection={props.selection} onSelect={props.onSelect} />
        ) : <Progress isIndeterminate />}
      </Box>
    </Box>
  )
}
