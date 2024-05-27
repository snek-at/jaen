import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Text,
  VStack
} from '@chakra-ui/react'
import {useState} from 'react'

export interface SelectorBlockType {
  slug: string
  label: string
  Icon: React.ComponentType<{}>
}

export type SelectorBlockAddType = 'append' | 'prepend' | 'add'

export interface SectionBlockSelectorProps {
  sectionTitle: string
  sectionDescription: string
  blockTypes: SelectorBlockType[]
  onBlockAdd: (block: SelectorBlockType, type: SelectorBlockAddType) => void

  onlyAdd?: boolean
}

export const SectionBlockSelector: React.FC<SectionBlockSelectorProps> = ({
  sectionTitle,
  sectionDescription,
  blockTypes,
  onBlockAdd,
  onlyAdd
}) => {
  const [selection, setSelection] = useState<SelectorBlockType | null>(
    blockTypes[0] || null
  )

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
      <Box w="100%">
        <Text fontSize="md" fontWeight="bold" textAlign="left">
          {sectionTitle}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {sectionDescription}
        </Text>
      </Box>
      <VStack w="100%" align="flex-start" spacing="1">
        {blockTypes.map(block => {
          return (
            <HStack
              key={block.slug}
              rounded="md"
              w="100%"
              p="2"
              bg={selection?.slug === block.slug ? 'gray.200' : 'white'}
              transition="all 0.2s"
              cursor="pointer"
              _hover={{
                bg: 'gray.100'
              }}
              onClick={() => {
                // Check if the selection is the same
                if (selection?.slug === block.slug) {
                  setSelection(null)
                } else {
                  setSelection(block)
                }
              }}>
              <Icon as={block.Icon} />
              <Text fontSize="sm">{block.label}</Text>
            </HStack>
          )
        })}
      </VStack>
      <HStack w="100%">
        {onlyAdd ? (
          <Button
            size="sm"
            flex="1"
            isDisabled={selection == null}
            onClick={() => {
              if (selection == null) return

              onBlockAdd(selection, 'add')
            }}>
            Add
          </Button>
        ) : (
          <ButtonGroup size="sm">
            <Button
              flex="1"
              isDisabled={selection == null}
              onClick={() => {
                if (selection == null) return
                onBlockAdd(selection, 'prepend')
              }}>
              Prepend
            </Button>
            <Button
              flex="1"
              isDisabled={selection == null}
              onClick={() => {
                if (selection == null) return
                onBlockAdd(selection, 'append')
              }}>
              Append
            </Button>
          </ButtonGroup>
        )}
      </HStack>
    </VStack>
  )
}
