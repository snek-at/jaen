import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'

import {FieldGroup} from '../../../../components/shared/FieldGroup'
import {FormImageChooser} from '../../../../components/shared/FormImageChooser'

export interface AccountFormData {
  firstName: string
  lastName: string
  username: string
  avatarURL: string
}

export interface AccountFormProps {
  onSubmit: (
    data: AccountFormData & {
      avatarFile: File | null
    }
  ) => Promise<void>
  defaultValues?: Partial<AccountFormData>
}

export const AccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  defaultValues
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: {errors, isSubmitting},
    setValue,
    reset
  } = useForm<AccountFormData>({
    defaultValues
  })

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)

  const onFormSubmit = handleSubmit(async data => {
    // promise to wait for image upload

    await onSubmit({
      ...data,
      avatarFile
    })

    reset(data)
  })

  return (
    <form onSubmit={onFormSubmit}>
      <FieldGroup title="Account">
        <Stack width="full" spacing="8" maxW="2xl">
          <Stack>
            <FormControl id="firstName" isInvalid={!!errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="" {...register('firstName', {})} />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="lastName" isInvalid={!!errors?.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="" {...register('lastName', {})} />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl id="username" isInvalid={!!errors.username} isDisabled>
            <FormLabel>Username</FormLabel>
            <Input
              isDisabled
              maxW="xs"
              {...register('username', {
                required: 'This field is required'
              })}
              autoComplete="false"
              color="fg.muted"
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="image">
            <FormLabel>Image</FormLabel>

            <Controller
              control={control}
              name="avatarURL"
              render={({field: {value}}) => {
                return (
                  <FormImageChooser
                    value={value}
                    onChoose={file => {
                      setAvatarFile(file)
                      setValue('avatarURL', URL.createObjectURL(file), {
                        shouldDirty: true
                      })
                    }}
                    onRemove={() => {
                      setAvatarFile(null)
                      setValue('avatarURL', defaultValues?.avatarURL || '')
                    }}
                    description="Upload a profile picture to make your account easier to recognize."
                  />
                )
              }}
            />
          </FormControl>

          <ButtonGroup>
            <Button isLoading={isSubmitting} type="submit" variant="outline">
              Update account
            </Button>
          </ButtonGroup>
        </Stack>
      </FieldGroup>
    </form>
  )
}

export default AccountForm
