import {
  HStack,
  Button,
  Box,
  Text,
  Image,
  Stack,
  Center,
  Skeleton
} from '@chakra-ui/react'
import {useState} from 'react'
import {FaCloudUploadAlt} from 'react-icons/fa'

export interface FormMediaChooserProps {
  onChoose: () => void
  value?: string
  onRemove: () => void
  description?: string
}

export const FormMediaChooser: React.FC<FormMediaChooserProps> = props => {
  const [isLoading, setIsLoading] = useState(false)

  const onChoose = async () => {
    setIsLoading(true)
    try {
      await props.onChoose()
    } catch (e) {}
    setIsLoading(false)
  }

  return (
    <Stack direction="row" spacing="6" align="center" width="full">
      <Box boxSize={36} minW="36" borderRadius="lg" bg="bg.subtle">
        {props.value ? (
          <Image
            borderRadius="lg"
            boxSize="100%"
            src={props.value}
            fallback={<Skeleton borderRadius="lg" boxSize="100%" />}
          />
        ) : (
          <Center boxSize="100%" borderRadius="lg">
            <Text color="muted" fontSize="sm">
              No image
            </Text>
          </Center>
        )}
      </Box>
      <Stack>
        <HStack spacing="5">
          <Button
            isLoading={isLoading}
            variant="outline"
            leftIcon={<FaCloudUploadAlt />}
            onClick={onChoose}>
            Choose media
          </Button>
          {props.value && (
            <Button variant="ghost" onClick={props.onRemove}>
              Remove
            </Button>
          )}
        </HStack>
        <Text fontSize="sm" mt="3" color="muted">
          {props.description}
        </Text>
      </Stack>
    </Stack>
  )
}
