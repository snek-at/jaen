import {
  BoxProps,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

interface BaseTune {
  name: string
  label?: string
  props?: BoxProps & Record<string, any>
  requiredProps?: string[]
  onTune?: () => void
  Icon: React.ComponentType<{}>
  isDisableOnActive?: boolean
  isHiddenOnActive?: boolean
}

export interface Tune extends BaseTune {
  type: 'tune'
  label: string
}

interface GroupTune {
  type: 'groupTune'
  name: string
  label: string
  tunes: BaseTune[]
}

export type TuneOption = Tune | GroupTune

export interface TuneSelectorProps {
  tunes: TuneOption[]
  activeTunes?: Array<{
    name: string
    groupName?: string
  }>
  onTune: (info: {name: string; groupName?: string; isActive: boolean}) => void
  onClose: () => void
}

export const TuneSelector: React.FC<TuneSelectorProps> = ({
  tunes,
  activeTunes = [],
  onTune,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredTunes = tunes.filter(tune => {
    if ('type' in tune && tune.type === 'groupTune') {
      return tune.tunes.some(
        subTune =>
          subTune.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subTune.label?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      return (
        tune.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tune.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  })

  const handleTune = (info: {
    tune: BaseTune
    group?: GroupTune
    isActive: boolean
  }) => {
    info.tune.onTune?.()

    onTune({
      name: info.tune.name,
      groupName: info.group?.name,
      isActive: info.isActive
    })

    onClose()
  }

  return (
    <VStack
      p="3"
      rounded="xl"
      bg="white"
      w="48"
      maxW="300px"
      shadow="lg"
      border="1px"
      borderColor="gray.100">
      <InputGroup size="sm" variant="filled" rounded="md">
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          px="10"
          py="1"
          bg="gray.50"
          _hover={{
            bg: 'gray.100'
          }}
          _focus={{
            bg: 'gray.100',
            boxShadow: 'outline'
          }}
        />
      </InputGroup>
      <VStack
        w="100%"
        align="flex-start"
        spacing="1"
        maxH="xs"
        overflowY="auto">
        {filteredTunes.map((tune, index) => {
          if ('type' in tune && tune.type === 'groupTune') {
            return (
              <VStack key={index} w="full">
                <Text fontSize="sm" as="b">
                  {tune.label}
                </Text>
                <Wrap spacing="1">
                  {tune.tunes.map((subTune, subIndex) => {
                    const isActive = activeTunes.some(
                      activeTune =>
                        activeTune.name === subTune.name &&
                        activeTune.groupName === tune.name
                    )

                    const isDisabled = isActive && subTune.isDisableOnActive

                    const isHidden = isActive && subTune.isHiddenOnActive

                    return (
                      <WrapItem
                        key={subIndex}
                        display={isHidden ? 'none' : 'flex'}>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label={`${subTune.name}`}
                          icon={<Icon as={subTune.Icon} />}
                          {...(isActive && {
                            bg: 'gray.100',
                            cursor: 'pointer'
                          })}
                          isDisabled={isDisabled}
                          onClick={() => {
                            handleTune({tune: subTune, group: tune, isActive})
                          }}
                        />
                      </WrapItem>
                    )
                  })}
                </Wrap>
              </VStack>
            )
          }

          if ('type' in tune && tune.type === 'tune') {
            const isActive = activeTunes.some(
              activeTune => activeTune.name === tune.name
            )

            const isDisabled = isActive && tune.isDisableOnActive

            const isHidden = isActive && tune.isHiddenOnActive

            return (
              <HStack
                key={index}
                display={isHidden ? 'none' : 'flex'}
                rounded="md"
                w="100%"
                p="2"
                transition="all 0.2s"
                _hover={{
                  bg: 'gray.100'
                }}
                {...(isActive && {
                  bg: 'gray.100',
                  cursor: 'pointer'
                })}
                {...(isDisabled && {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                })}
                onClick={() => {
                  if (!isDisabled) {
                    handleTune({tune, isActive})
                  }
                }}>
                {tune.Icon && <Icon as={tune.Icon} />}
                <Text fontSize="sm">{tune.name}</Text>
              </HStack>
            )
          }

          return null
        })}
      </VStack>
    </VStack>
  )
}
