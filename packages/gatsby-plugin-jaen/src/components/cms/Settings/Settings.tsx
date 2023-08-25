import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Textarea,
  VStack
} from '@chakra-ui/react'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'

import FormMediaChooser from '../../../containers/form-media-chooser'
import {FieldGroup} from '../../shared/FieldGroup'

export interface FormDataType {
  siteMetadata?: {
    title?: string
    siteUrl?: string
    description?: string
    image?: string
    organization?: {
      name?: string
      url?: string
      logo?: string
    }
    author?: {
      name?: string
    }
  }
}

export interface SettingsProps {
  data: FormDataType
  onUpdate: (data: FormDataType) => void
}

export const Settings: React.FC<SettingsProps> = ({data, onUpdate}) => {
  const [defaultValues, setDefaultValues] = React.useState(data)

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: {errors, isSubmitting, isDirty}
  } = useForm<FormDataType>({
    defaultValues
  })

  const onSubmit = (values: FormDataType) => {
    onUpdate(values)
  }

  useEffect(() => {
    setDefaultValues(data)

    reset({
      siteMetadata: Object.keys(data.siteMetadata || {}).length
        ? data.siteMetadata
        : null
    })
  }, [data])

  console.log('values', getValues())

  return (
    <Box id="coco">
      <form
        onSubmit={data => {
          void handleSubmit(onSubmit)(data)
        }}>
        <Stack
          spacing="4"
          divider={<StackDivider />}
          px={{base: '4', md: '10'}}>
          <Heading size="sm">Settings</Heading>

          <FieldGroup title="Site Info">
            <VStack width="full" spacing="6">
              <FormControl isInvalid={!!errors?.siteMetadata?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  {...register('siteMetadata.title', {
                    maxLength: {value: 100, message: 'Title is too long'}
                  })}
                />
                <FormErrorMessage>
                  {errors.siteMetadata?.title?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.siteMetadata?.siteUrl}>
                <FormLabel>URL</FormLabel>
                <Input
                  placeholder="https://snek.at"
                  {...register('siteMetadata.siteUrl', {
                    validate: {
                      checkUrl: value =>
                        value && !/^https?:\/\//.test(value)
                          ? 'URL must start with http:// or https://'
                          : undefined
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.siteMetadata?.siteUrl?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.siteMetadata?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  rows={5}
                  placeholder="The description that appears in search engines and social media."
                  {...register('siteMetadata.description')}
                />
                {!errors.siteMetadata?.description && (
                  <FormHelperText>
                    Brief description for your site.
                  </FormHelperText>
                )}

                <FormErrorMessage>
                  {errors.siteMetadata?.description?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl id="image">
                <FormLabel>Image</FormLabel>

                <Controller
                  control={control}
                  name="siteMetadata.image"
                  render={({field: {value}}) => {
                    return (
                      <FormMediaChooser
                        value={value}
                        onChoose={media => {
                          setValue('siteMetadata.image', media.url, {
                            shouldDirty: true
                          })
                        }}
                        onRemove={() => {
                          setValue('siteMetadata.image', '', {
                            shouldDirty: true
                          })
                        }}
                        description="Upload a photo to represent the site."
                      />
                    )
                  }}
                />
              </FormControl>
            </VStack>
          </FieldGroup>

          <FieldGroup title="Organisation">
            <VStack width="full" spacing="6">
              <FormControl
                isInvalid={!!errors?.siteMetadata?.organization?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Snek"
                  {...register('siteMetadata.organization.name', {
                    maxLength: {value: 100, message: 'Name is too long'}
                  })}
                />
                <FormErrorMessage>
                  {errors.siteMetadata?.organization?.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors?.siteMetadata?.organization?.url}>
                <FormLabel>Url</FormLabel>
                <Input
                  placeholder="https://snek.at"
                  {...register('siteMetadata.organization.url', {
                    validate: {
                      checkUrl: value =>
                        value && !/^https?:\/\//.test(value)
                          ? 'Url must start with http:// or https://'
                          : undefined
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.siteMetadata?.organization?.url?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="image">
                <FormLabel>Image</FormLabel>

                <Controller
                  control={control}
                  name="siteMetadata.organization.logo"
                  render={({field: {value}}) => (
                    <FormMediaChooser
                      value={value}
                      onChoose={media => {
                        setValue('siteMetadata.organization.logo', media.url, {
                          shouldDirty: true
                        })
                      }}
                      onRemove={() => {
                        setValue('siteMetadata.organization.logo', '', {
                          shouldDirty: true
                        })
                      }}
                      description="Upload a photo to represent the organization."
                    />
                  )}
                />
              </FormControl>
            </VStack>
          </FieldGroup>

          <HStack justifyContent="right">
            <ButtonGroup>
              <Button
                variant="outline"
                isDisabled={!isDirty}
                onClick={() => {
                  reset(undefined, {
                    keepDirty: false
                  })
                }}>
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isDirty}>
                Save
              </Button>
            </ButtonGroup>
          </HStack>
        </Stack>
      </form>
    </Box>
  )
}
