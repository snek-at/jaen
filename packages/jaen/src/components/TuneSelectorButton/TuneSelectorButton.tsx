import {Box, Flex, Icon, IconButton, IconButtonProps} from '@chakra-ui/react'
import {useState} from 'react'
import {FaBars} from 'react-icons/fa'

import {TuneSelector, TuneSelectorProps} from './components/TuneSelector'

export interface TuneSelectorButtonProps extends IconButtonProps {
  tunes: TuneSelectorProps['tunes']
  onTune?: TuneSelectorProps['onTune']
  activeTunes?: TuneSelectorProps['activeTunes']
}

export const TuneSelectorButton: React.FC<TuneSelectorButtonProps> = ({
  tunes,
  onTune = () => {},
  activeTunes = [],
  ...iconButtonProps
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Flex pos="relative">
      <IconButton
        variant="field-highlighter-tooltip"
        icon={<Icon as={FaBars} />}
        onClick={toggleOpen}
        {...iconButtonProps}
      />
      {isOpen && (
        <Box position="absolute" top="6" left="0" zIndex="popover" p="2">
          <TuneSelector
            tunes={tunes}
            onTune={onTune}
            activeTunes={activeTunes}
            onClose={() => {
              setIsOpen(false)
            }}
          />
        </Box>
      )}
    </Flex>
  )
}
