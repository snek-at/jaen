import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  HStack,
  IconButton,
  Input,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import React from 'react'
import {useForm} from 'react-hook-form'
import {FaTrash} from 'react-icons/fa'

import {Link} from '../../../../components/shared/Link'
import {FieldGroup} from '../../../../components/shared/FieldGroup'

interface EmailData {
  id: string
  emailAddress: string
  isVerified?: boolean
  isPrimary?: boolean
}

export interface EmailFormData {
  emailAddress: string
}

export interface EmailFormProps {
  onSubmit: (email: EmailFormData) => Promise<void>
  onRemove: (emailId: string) => Promise<void>
  onResendVerification: (emailId: string) => Promise<void>
  defaultValues?: {
    emails: EmailData[]
  }
}

export const EmailForm: React.FC<EmailFormProps> = ({
  onSubmit,
  onRemove,
  onResendVerification,
  defaultValues
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: {errors, isSubmitting},
    setValue,
    reset
  } = useForm<EmailFormData>()

  const onFormSubmit = handleSubmit(async data => {
    await onSubmit(data)

    reset()
  })

  return (
    <FieldGroup title="Emails">
      <Stack spacing="6">
        <Card maxW="full">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {defaultValues?.emails
                .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
                .map(email => {
                  return (
                    <Stack key={email.id}>
                      <HStack justify="space-between">
                        <HStack>
                          <Text fontSize="sm" fontWeight="bold">
                            {email.emailAddress}
                          </Text>
                          -{' '}
                          <Text>
                            {email.isPrimary && (
                              <>
                                -{'  '}
                                <Text fontSize="sm" as="span" color="green.500">
                                  Primary
                                </Text>
                              </>
                            )}
                          </Text>
                        </HStack>
                        <IconButton
                          size="xs"
                          aria-label="Delete email address"
                          variant="ghost"
                          color="red.500"
                          visibility={email.isPrimary ? 'hidden' : 'visible'}
                          icon={<FaTrash />}
                          onClick={() => onRemove(email.id)}
                        />
                      </HStack>

                      <UnorderedList>
                        {email.isPrimary && (
                          <ListItem fontSize="sm" color="muted">
                            Primary email addresses are used for account-related
                            communications (e.g. password resets).
                          </ListItem>
                        )}

                        {!email.isVerified && (
                          <ListItem fontSize="sm" color="muted">
                            <HStack>
                              <Text>Unverified</Text>
                              <Link
                                onClick={() => {
                                  onResendVerification(email.id)
                                }}>
                                Resend verification email
                              </Link>
                            </HStack>
                          </ListItem>
                        )}
                      </UnorderedList>
                    </Stack>
                  )
                })}
            </Stack>
          </CardBody>
        </Card>

        <Stack spacing="4">
          <Text fontSize="sm" color="muted">
            Add an email address to your account.
          </Text>
          <form onSubmit={onFormSubmit}>
            <Stack direction="row" spacing="4">
              <Input
                maxW="xs"
                {...register('emailAddress', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="Email"
              />
              <ButtonGroup>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Adding..."
                  variant="outline">
                  Add
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </FieldGroup>
  )
}
