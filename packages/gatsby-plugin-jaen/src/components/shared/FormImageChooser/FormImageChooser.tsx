import React, {useState, useCallback} from 'react'
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
import {FaCloudUploadAlt} from 'react-icons/fa'
import {useDropzone} from 'react-dropzone'

export interface FormImageChooserProps {
  onChoose: (file: File) => void
  value?: string
  onRemove: () => void
  description?: string
}

export const FormImageChooser: React.FC<FormImageChooserProps> = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const onChoose = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true)

        // Simulate a delay for demonstration purposes
        setTimeout(() => {
          setIsLoading(false)
          setSelectedImage(acceptedFiles[0]!)
          props.onChoose(acceptedFiles[0]!)
        }, 1000)
      }
    },
    [props]
  )

  const onRemoveImage = () => {
    setSelectedImage(null)
    props.onRemove()
  }

  const {getRootProps, getInputProps, open} = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
    },
    onDrop: onChoose,
    multiple: false
  })

  return (
    <Stack direction="row" spacing="6" align="center" width="full">
      <Box
        boxSize={36}
        minW="36"
        borderRadius="lg"
        bg="bg.subtle"
        {...getRootProps()}>
        {selectedImage || props.value ? (
          <Image
            borderRadius="lg"
            boxSize="100%"
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : props.value
            }
            fallback={<Skeleton borderRadius="lg" boxSize="100%" />}
          />
        ) : (
          <Center boxSize="100%" borderRadius="lg">
            <Text color="muted" fontSize="sm">
              No image
            </Text>
          </Center>
        )}
        <input {...getInputProps()} />
      </Box>
      <Stack>
        <HStack spacing="5">
          <Button
            isLoading={isLoading}
            variant="outline"
            leftIcon={<FaCloudUploadAlt />}
            onClick={open}>
            Choose media
          </Button>
          {selectedImage && (
            <Button variant="ghost" onClick={onRemoveImage}>
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
