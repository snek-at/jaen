import {PageConfig, PageProps, useNotificationsContext} from '@atsnek/jaen'
import {useEffect, useMemo} from 'react'

import {CopyIcon, DeleteIcon} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import {Editor} from '@monaco-editor/react'
import {Link as GatsbyLink, navigate} from 'gatsby'
import {sanitize} from 'isomorphic-dompurify'
import {Controller, useFieldArray, useForm} from 'react-hook-form'
import {useQuery} from 'snek-query/react-hooks'
import {sq} from '../../../client/src'
import {
  EmailTemplate,
  VariableDefinition
} from '../../../client/src/schema.generated'
import templates from '.'

const Page: React.FC<PageProps> = ({params}) => {
  const templateId = params.templateId

  if (!templateId) {
    throw new Error('Template ID is required')
  }

  const {toast, confirm} = useNotificationsContext()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: {errors, isSubmitting, isDirty}
  } = useForm<{
    id: string
    parentId?: string
    description: string
    verifyReplyTo?: boolean
    content: string
    transformer?: string
    updatedAt: string
    createdAt: string
    envelope: {
      subject?: string
      to?: {
        email: string
      }[]
      replyTo?: string
    }
    variables: {
      id?: string
      name: string
      isRequired?: boolean
      isConstant?: boolean
      description?: string
      defaultValue?: string
    }[]
  }>({
    defaultValues: {
      id: '',
      description: '',
      content: '',
      updatedAt: '',
      createdAt: '',
      envelope: {
        subject: '',
        to: [],
        replyTo: ''
      }
    }
  })

  const variablesField = useFieldArray({
    control,
    name: 'variables'
  })

  const envelopeToField = useFieldArray({
    control,
    name: 'envelope.to'
  })

  const unsafeContent = watch('content')

  const templateContent = useMemo(() => {
    return sanitize(unsafeContent || '')
  }, [unsafeContent])

  const {data, isLoading, error, refetch} = useQuery(sq)

  useEffect(() => {
    if (error) {
      toast({
        title: 'Failed to load template',
        description: (error as any)[0].message
      })
    }
  }, [error])

  useEffect(() => {
    const template = data.template({id: templateId})

    reset({
      id: template.id,
      parentId: template.parent()?.id ?? undefined,
      description: template.description,
      verifyReplyTo: template.verifyReplyTo ?? false,
      content: template.content,
      transformer: template.transformer ?? undefined,
      updatedAt: template.updatedAt,
      createdAt: template.createdAt,
      envelope: {
        subject: template.envelope()?.subject ?? undefined,
        to: template.envelope()?.to?.map(email => ({email})) || undefined,
        replyTo: template.envelope()?.replyTo ?? undefined
      },
      variables: template.variables().nodes.map(v => ({
        id: v.id,
        name: v.name,
        isRequired: v.isRequired ?? undefined,
        isConstant: v.isConstant ?? undefined,
        description: v.description || undefined,
        defaultValue: v.defaultValue || undefined
      }))
    })
  }, [data])

  const onSubmit = handleSubmit(async data => {
    if (data.transformer) {
      const [_, errors] = await sq.mutate(m =>
        m.templateTransformer({
          id: templateId,
          transformer: data.transformer!
        })
      )

      if (errors) {
        toast({
          title: 'Error!',
          description: `Error updating transformer for template ${templateId}`,
          status: 'error'
        })
      }
    }

    const [_, errors] = await sq.mutate(m =>
      m.templateUpdate({
        id: templateId,
        data: {
          description: data.description,
          parentId: data.parentId || undefined,
          verifyReplyTo: data.verifyReplyTo ?? undefined,
          content: data.content,
          envelope: {
            subject: data.envelope.subject || undefined,
            to: data.envelope.to?.map(to => to.email) || undefined,
            replyTo: data.envelope.replyTo || undefined
          },
          variables: data.variables.map(v => ({
            name: v.name,
            isRequired: v.isRequired ?? undefined,
            isConstant: v.isConstant ?? undefined,
            description: v.description || undefined,
            defaultValue: v.defaultValue || undefined
          }))
        }
      })
    )

    if (errors) {
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

    refetch()
  })

  const handleDeleteClick = async () => {
    const confirmed = await confirm({
      title: 'Delete Template',
      message: `Are you sure you want to delete this template?`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    })
    if (confirmed) {
      // delete using sq
      const [data, errors] = await sq.mutate(m =>
        m.templateDelete({
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

  return (
    <Stack spacing="4">
      <Tag size="lg" variant="solid" colorScheme="blue">
        {data.me?.organization()?.email()?.email || 'No Email Configured'}
      </Tag>

      <Heading size="md">Email Template</Heading>

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

      <form onSubmit={onSubmit}>
        <Stack spacing="8">
          <Stack spacing="4">
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

            <Skeleton isLoaded={!isLoading}>
              <FormControl id="parent">
                <FormLabel>Parent</FormLabel>
                <Select {...register('parentId')}>
                  {data
                    .allTemplate()
                    .nodes.filter(n => n.id !== templateId)
                    .map(t => (
                      <option key={t.id} value={t.id}>
                        {t.description} ({t.id})
                      </option>
                    ))}
                </Select>
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl id="verifyReplyTo">
                <FormLabel>Verify Reply To</FormLabel>
                <Checkbox {...register('verifyReplyTo')} />
              </FormControl>
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <FormControl id="linked">
                <FormLabel>Linked</FormLabel>
                {data.template({id: templateId}).links().nodes.length ? (
                  <UnorderedList>
                    {data
                      .template({id: templateId})
                      .links()
                      .nodes.map(t => (
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

            <Card>
              <CardHeader>
                <Heading size="sm">Envelope</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <FormControl id="subject">
                    <FormLabel htmlFor="subject">Subject</FormLabel>
                    <Input
                      type="text"
                      id="subject"
                      {...register('envelope.subject')}
                    />
                  </FormControl>

                  <Card>
                    <CardHeader>To</CardHeader>
                    <CardBody>
                      <Stack>
                        {envelopeToField.fields.map((field, index) => (
                          <FormControl key={index} id={`envelope.to.${index}`}>
                            <InputGroup>
                              <Input
                                type="text"
                                placeholder="Enter email address"
                                {...register(`envelope.to.${index}.email`)}
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label="delete to field"
                                  icon={<DeleteIcon />}
                                  onClick={() => envelopeToField.remove(index)}
                                  variant="ghost"
                                />
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                        ))}
                      </Stack>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => envelopeToField.append({email: ''})}>
                        Add To
                      </Button>
                    </CardFooter>
                  </Card>

                  <FormControl id="replyTo">
                    <FormLabel htmlFor="replyTo">Reply To</FormLabel>
                    <Input
                      type="text"
                      id="replyTo"
                      placeholder="Enter email address"
                      {...register('envelope.replyTo')}
                    />
                  </FormControl>
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <Heading size="sm">Transformer</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
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

            <Card>
              <CardHeader>
                <Heading size="sm">Content</Heading>
              </CardHeader>
              <CardBody>
                <Stack>
                  <Stack>
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

            <Card>
              <CardHeader>
                <Heading size="sm">Variables</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <Table variant="striped" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Default Value</Th>
                        <Th>Required</Th>
                        <Th>Constant</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {variablesField.fields.map((field, index) => (
                        <Tr key={index}>
                          <Td>
                            <Input
                              type="text"
                              defaultValue={field.name}
                              {...register(`variables.${index}.name`)}
                            />
                          </Td>
                          <Td>
                            <Textarea
                              minH="10"
                              {...register(`variables.${index}.description`)}
                            />
                          </Td>
                          <Td>
                            <Input
                              type="text"
                              {...register(`variables.${index}.defaultValue`)}
                            />
                          </Td>
                          <Td>
                            <Checkbox
                              {...register(`variables.${index}.isRequired`)}
                            />
                          </Td>
                          <Td>
                            <Checkbox
                              {...register(`variables.${index}.isConstant`)}
                            />
                          </Td>
                          <Td>
                            <Button
                              colorScheme="red"
                              onClick={() => variablesField.remove(index)}>
                              Remove
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  <Button
                    onClick={() =>
                      variablesField.append({name: 'NEW_VARIABLE'})
                    }>
                    Add Variable
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Stack>

          <ButtonGroup justifyContent="end" isDisabled={isLoading}>
            <Button
              type="button"
              variant="outline"
              colorScheme="red"
              isDisabled={isLoading || isSubmitting}
              onClick={handleDeleteClick}>
              Delete
            </Button>

            <Button
              type="button"
              variant="outline"
              isDisabled={isLoading || isSubmitting || !isDirty}
              onClick={() => {
                refetch()
              }}>
              Cancel
            </Button>

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
