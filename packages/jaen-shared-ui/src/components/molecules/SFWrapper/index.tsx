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
  VStack
} from '@chakra-ui/react'
import {FaCube} from '@react-icons/all-files/fa/FaCube'
import React from 'react'

export type SFWrapperProps = {
  ref: React.Ref<HTMLDivElement>
  displayName: string
  blockTypes: {name: string; onClick: () => void}[]
}

const SFWrapper: React.FC<SFWrapperProps> = ({children, ...props}) => {
  const popover = useDisclosure()

  return (
    <Box>
      <Popover
        trigger="hover"
        placement="auto"
        isOpen={popover.isOpen}
        onOpen={popover.onOpen}
        onClose={popover.onClose}>
        <PopoverTrigger>
          <Box
            ref={props.ref}
            boxShadow={popover.isOpen ? 'outline' : 'none'}
            rounded="md">
            {React.Children.toArray(children).length ? (
              children
            ) : (
              <Skeleton h={20} />
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />

          <PopoverHeader>{`${props.displayName}`} </PopoverHeader>
          <PopoverBody>
            <VStack align="stretch">
              {props.blockTypes.map(({name, onClick}, index) => (
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
    </Box>
  )
}

export default SFWrapper
