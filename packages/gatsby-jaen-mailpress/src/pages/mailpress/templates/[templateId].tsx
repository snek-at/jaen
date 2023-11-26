import {PageConfig, PageProps, useNotificationsContext} from '@atsnek/jaen'
import {sq} from '@snek-functions/origin'
import {useEffect, useMemo, useState} from 'react'

import {CopyIcon} from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  ListItem,
  Select,
  Skeleton,
  Stack,
  Text,
  Textarea,
  UnorderedList,
  useClipboard
} from '@chakra-ui/react'
import {Editor} from '@monaco-editor/react'
import {Link as GatsbyLink, navigate} from 'gatsby'
import {sanitize} from 'isomorphic-dompurify'
import {Controller, useForm} from 'react-hook-form'
import {asEnumKey} from 'snek-query'
import {
  EmailAddress,
  EmailAddressType
} from '@snek-functions/origin/dist/schema.generated'

interface MailPressTemplate {
  id: string
  description: string
  updatedAt: string
  createdAt: string
  envelope?: {
    subject?: string | null
    from?: EmailAddress | null
    to?: string
    replyTo?: EmailAddress | null
  }
  authorizationUser?: {
    userId?: string
    authorization?: string
  }
  transformer?: string | null
  parent?: {
    id?: string | null
    description?: string | null
  }
  linked?: {
    id?: string | null
    description?: string | null
  }[]
  content?: string | null
  variables?: string
}

const Page: React.FC<PageProps> = ({params}) => {
  const templateId = params.templateId

  if (!templateId) {
    return null
  }

  const [isLoading, setIsLoading] = useState(true)

  const [template, setTemplate] = useState<MailPressTemplate | null>(null)

  useEffect(() => {
    // mock data
    const load = async () => {
      setIsLoading(true)

      const [data, errors] = await sq.query(q => {
        const t = q.mailpressTemplate({id: templateId})

        return {
          id: t.id,
          description: t.description,
          transformer: t.transformer,
          content: t.content,
          updatedAt: t.updatedAt,
          createdAt: t.createdAt,
          envelope: {
            subject: t.envelope?.subject,
            from: t.envelope?.from,
            to: JSON.stringify(
              t.envelope?.to?.map(e => ({
                value: e.value,
                type: e.type
              }))
            ),
            replyTo: t.envelope?.replyTo
          },
          authorizationUser: {
            userId: t.authorizationUser?.userId,
            authorization: t.authorizationUser?.authorization
          },
          parent: {
            id: t.parent?.id,
            description: t.parent?.description
          },
          linked: t.linked?.map(l => ({
            id: l.id,
            description: l.description
          })),

          variables: JSON.stringify(
            t.variables.map(v => ({
              id: v.id,
              name: v.name,
              isRequired: v.isRequired,
              isConstant: v.isConstant,
              description: v.description,
              defaultValue: v.defaultValue
            }))
          )
        }
      })

      if (errors?.length) {
        toast({
          title: 'Error!',
          description: `Error loading template ${templateId}`,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        setTemplate(data as any)
      }

      setIsLoading(false)
    }

    load()
  }, [templateId])

  const [templates, setTemplates] = useState<
    {
      id: string
      description: string
    }[]
  >([])

  useEffect(() => {
    const loadAllTemplateForParentChooser = async () => {
      const [data, errors] = await sq.query(q => {
        return q.mailpressAllTemplate.map(t => {
          return {
            id: t.id,
            description: t.description
          }
        })
      })

      if (errors?.length) {
        toast({
          title: 'Error!',
          description: `Error loading templates`,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else {
        // remove current template from list
        const filtered = data.filter(t => t.id !== templateId)

        setTemplates(filtered)
      }
    }

    loadAllTemplateForParentChooser()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: {errors, isSubmitting, isDirty}
  } = useForm<MailPressTemplate>({
    defaultValues: {
      id: '',
      description: '',
      updatedAt: '',
      createdAt: ''
    }
  })

  const unsafeContent = watch('content')

  const templateContent = useMemo(() => {
    return sanitize(unsafeContent || '')
  }, [unsafeContent])

  useEffect(() => {
    if (template) {
      reset(template)
    }
  }, [template])

  const onSubmit = async (formData: MailPressTemplate) => {
    console.log(formData)

    // update using sq
    const [data, errors] = await sq.mutate(u =>
      u.mailpressTemplateUpdate({
        id: templateId,
        data: {
          description: formData.description,
          envelope: {
            subject: formData.envelope?.subject,
            from:
              formData.envelope?.from?.value && formData.envelope?.from?.type
                ? {
                    value: formData.envelope?.from.value,
                    type: asEnumKey(
                      EmailAddressType,
                      formData.envelope?.from.type
                    )
                  }
                : undefined,
            to: JSON.parse(formData.envelope?.to || '[]').map((e: any) => ({
              value: e.value,
              type: asEnumKey(EmailAddressType, e.type)
            })),
            replyTo:
              formData.envelope?.replyTo?.value &&
              formData.envelope?.replyTo?.type
                ? {
                    value: formData.envelope?.replyTo.value,
                    type: asEnumKey(
                      EmailAddressType,
                      formData.envelope?.replyTo.type
                    )
                  }
                : undefined
          },
          transformer: formData.transformer,
          content: formData.content,
          parentId: formData.parent?.id ? formData.parent?.id : undefined,
          linkedIds: formData.linked?.map((t: any) => t.id),
          variables: JSON.parse(formData.variables || '[]')
        } as any
      })
    )

    if (errors?.length) {
      toast({
        title: 'Error!',
        description: `Error updating template ${templateId}`,
        status: 'error'
      })
    } else {
      toast({
        title: 'Template Updated!',
        description: `Template ID ${templateId} updated`,
        status: 'success'
      })
    }
  }

  const {toast, confirm} = useNotificationsContext()

  const handleDeleteClick = async () => {
    const confirmed = await confirm({
      title: 'Delete Template',
      message: `Are you sure you want to delete this template?`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    })

    if (confirmed) {
      // delete using sq
      const [data, errors] = await sq.mutate(u =>
        u.mailpressTemplateDelete({
          id: templateId
        })
      )

      if (errors?.length) {
        toast({
          title: 'Error!',
          description: `Error deleting template ${templateId}`,
          status: 'error'
        })
      } else {
        toast({
          title: 'Template Deleted!',
          description: `Template ID ${templateId} deleted`,
          status: 'success'
        })

        navigate('..')
      }
    }
  }

  const onCopy = () => {
    const value = templateId

    navigator.clipboard.writeText(value)

    toast({
      title: 'Copied!',
      description: `Template ID ${value} copied to clipboard`,
      status: 'success'
    })
  }

  // Form with chakraui components
  return (
    <Stack spacing="4">
      <Heading size="md">Email Template</Heading>

      {/* Template ID with copy button */}
      <Skeleton isLoaded={!isLoading}>
        <InputGroup>
          <InputLeftAddon>Template ID</InputLeftAddon>
          <Input type="text" defaultValue={templateId} isDisabled />
          <InputRightElement
            as={IconButton}
            icon={<CopyIcon />}
            variant="outline"
            onClick={onCopy}></InputRightElement>
        </InputGroup>
      </Skeleton>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <Stack spacing="4">
            {/* Description Field */}
            <Skeleton isLoaded={!isLoading}>
              <FormControl
                id="description"
                isRequired
                isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Input type="text" {...register('description')} />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </Skeleton>

            {/* Parent Field */}
            <Skeleton isLoaded={!isLoading}>
              <FormControl id="parent">
                <FormLabel>Parent</FormLabel>
                <Select {...register('parent.id')}>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.description} ({t.id})
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Skeleton>

            {/* Linked Field just for display and link to template */}
            <Skeleton isLoaded={!isLoading}>
              <FormControl id="linked">
                <FormLabel>Linked</FormLabel>
                {template?.linked?.length ? (
                  <UnorderedList>
                    {template?.linked?.map(t => (
                      <ListItem key={t.id}>
                        <Link as={GatsbyLink} to={`../${t.id}`}>
                          {t.description} ({t.id})
                        </Link>
                      </ListItem>
                    ))}
                  </UnorderedList>
                ) : (
                  <Text>No linked templates</Text>
                )}
              </FormControl>
            </Skeleton>

            {/* Envelope Card */}
            <Card>
              <CardHeader>
                <Heading size="sm">Envelope</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  {/* Subject Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="subject">
                      <FormLabel>Subject</FormLabel>
                      <Input type="text" {...register('envelope.subject')} />
                    </FormControl>
                  </Skeleton>

                  {/* From Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="from">
                      <FormLabel>From</FormLabel>
                      <InputGroup>
                        <Input
                          type="text"
                          {...register('envelope.from.value')}
                        />

                        <Select {...register('envelope.from.type')}>
                          {Object.keys(EmailAddressType).map(
                            (key: keyof typeof EmailAddressType) => (
                              <option key={key} value={key}>
                                {EmailAddressType[key]}
                              </option>
                            )
                          )}
                        </Select>
                      </InputGroup>
                    </FormControl>
                  </Skeleton>

                  {/* To Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="to">
                      <FormLabel>To</FormLabel>
                      <Input type="text" {...register('envelope.to')} />
                    </FormControl>
                  </Skeleton>

                  {/* Reply To Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="replyTo">
                      <FormLabel>Reply To</FormLabel>
                      <InputGroup>
                        <Input
                          type="text"
                          {...register('envelope.replyTo.value')}
                        />

                        <Select {...register('envelope.replyTo.type')}>
                          {Object.keys(EmailAddressType).map(
                            (key: keyof typeof EmailAddressType) => (
                              <option key={key} value={key}>
                                {EmailAddressType[key]}
                              </option>
                            )
                          )}
                        </Select>
                      </InputGroup>
                    </FormControl>
                  </Skeleton>
                </Stack>
              </CardBody>
            </Card>

            {/* Transformer Card */}
            <Card>
              <CardHeader>
                <Heading size="sm">Transformer</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  {/* Transformer Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="transformer">
                      <Controller
                        control={control}
                        name="transformer"
                        render={({field}) => (
                          <Editor
                            theme={'vs-dark'}
                            height="var(--chakra-sizes-xs)"
                            defaultLanguage="javascript"
                            defaultValue={field.value || undefined}
                            onChange={(value, event) => field.onChange(value)}
                          />
                        )}
                      />
                    </FormControl>
                  </Skeleton>
                </Stack>
              </CardBody>
            </Card>

            {/* Content Card */}
            <Card>
              <CardHeader>
                <Heading size="sm">Content</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <Stack>
                    {/* Content Field */}
                    <Skeleton isLoaded={!isLoading}>
                      <FormControl id="content">
                        <Controller
                          control={control}
                          name="content"
                          render={({field}) => (
                            <Editor
                              theme={'vs-dark'}
                              height="var(--chakra-sizes-md)"
                              defaultLanguage="html"
                              defaultValue={field.value || undefined}
                              onChange={(value, event) => field.onChange(value)}
                            />
                          )}
                        />
                      </FormControl>
                    </Skeleton>
                  </Stack>

                  {/* Preview */}
                  <Stack>
                    <Heading size="sm">Preview</Heading>
                    <Skeleton isLoaded={!isLoading}>
                      <Box
                        dangerouslySetInnerHTML={{__html: templateContent}}
                      />
                    </Skeleton>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>

            {/* Variables Card */}
            <Card>
              <CardHeader>
                <Heading size="sm">Variables</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  {/* Variables Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="variables">
                      <Textarea
                        {...register('variables')}
                        placeholder="JSON array of variables"
                      />
                    </FormControl>
                  </Skeleton>
                </Stack>
              </CardBody>
            </Card>

            {/* Authorization Card */}
            <Card>
              <CardHeader>
                <Heading size="sm">Authorization</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  {/* User ID Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="userId">
                      <Input
                        type="text"
                        {...register('authorizationUser.userId')}
                      />
                    </FormControl>
                  </Skeleton>

                  {/* Authorization Field */}
                  <Skeleton isLoaded={!isLoading}>
                    <FormControl id="authorization">
                      <Textarea
                        {...register('authorizationUser.authorization')}
                      />
                    </FormControl>
                  </Skeleton>
                </Stack>
              </CardBody>
            </Card>
          </Stack>

          <ButtonGroup justifyContent="end">
            {/* Delete Button */}
            <Button
              type="button"
              variant="outline"
              colorScheme="red"
              isDisabled={isLoading || isSubmitting}
              onClick={handleDeleteClick}>
              Delete
            </Button>

            {/* Cancel Button */}
            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading || isSubmitting || !isDirty}
              onClick={() => {
                if (template) {
                  reset(template)
                }
              }}>
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading || isSubmitting}
              isDisabled={isLoading || isSubmitting}>
              Save
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Stack>
  )
}

export const pageConfig: PageConfig = {
  label: 'Templates',
  icon: 'FaEnvelope',
  layout: {
    name: 'jaen'
  },
  breadcrumbs: [
    {
      label: 'Mailpress',
      path: '/mailpress/'
    },
    {
      label: 'Templates',
      path: '/mailpress/templates/'
    }
  ],
  auth: {
    isRequired: true,
    isAdminRequired: true
  }
}

export default Page
