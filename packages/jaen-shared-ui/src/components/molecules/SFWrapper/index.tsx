import {
  Box,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  useDisclosure,
  VStack,
  Wrap,
  WrapProps
} from '@chakra-ui/react'
import {FaCube} from '@react-icons/all-files/fa/FaCube'
import React from 'react'

export interface SFWrapperProps extends WrapProps {
  displayName: string
  blockTypes: {name: string; onClick: () => void}[]
  isEditing: boolean
  wrap?: boolean
}

const SFWrapper: React.FC<SFWrapperProps> = ({
  children,
  displayName,
  blockTypes,
  isEditing,
  wrap = false,
  ...wrapProps
}) => {
  const popover = useDisclosure()

  const shouldRenderSkeleton = React.useMemo(
    () => !React.Children.toArray(children).length,
    [children]
  )

  const Wrapper = wrap ? Wrap : Box

  if (!isEditing) {
    return <Wrapper {...wrapProps}>{children}</Wrapper>
  }

  return (
    <Popover
      trigger="hover"
      placement="auto"
      isOpen={popover.isOpen}
      onOpen={popover.onOpen}
      onClose={popover.onClose}>
      <PopoverTrigger>
        <Wrapper
          {...wrapProps}
          boxShadow={popover.isOpen ? 'outline' : 'none'}
          rounded="md">
          {shouldRenderSkeleton ? <Skeleton h={20} /> : children}
        </Wrapper>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />

        <PopoverHeader>{displayName}</PopoverHeader>
        <PopoverBody>
          <VStack align="stretch">
            {blockTypes.map(({name, onClick}, index) => (
              <Button
                key={index}
                leftIcon={<FaCube />}
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={() => {
                  onClick()
                }}>
                {name}
              </Button>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SFWrapper
