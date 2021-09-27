import {DeleteIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  VStack
} from '@chakra-ui/react'

export type SFBWrapperProps = {
  onDeleteClick: () => void
}

const SFBWrapper: React.FC<SFBWrapperProps> = ({children, ...props}) => {
  const popover = useDisclosure()

  const handleDeleteClick = () => {
    props.onDeleteClick()
    popover.onClose()
  }

  return (
    <Box>
      <Popover
        trigger="hover"
        placement="top-end"
        isOpen={popover.isOpen}
        onOpen={popover.onOpen}
        onClose={popover.onClose}>
        <PopoverTrigger>
          <Box boxShadow={popover.isOpen ? 'outline' : 'none'} rounded="md">
            {children}
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />

          {/* <PopoverHeader>{`Block Actions`}</PopoverHeader> */}
          <PopoverBody>
            <ButtonGroup>
              <IconButton
                aria-label="delete-block"
                icon={<DeleteIcon />}
                size="sm"
                variant="outline"
                color="red"
                onClick={handleDeleteClick}
              />
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default SFBWrapper
