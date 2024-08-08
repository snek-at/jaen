import {PageConfig, useNotificationsContext} from '@atsnek/jaen'
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Link,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {FaPlus} from '@react-icons/all-files/fa/FaPlus'
import {Link as GatsbyLink, graphql} from 'gatsby'
import {useQuery} from 'snek-query/react-hooks'
import {sq} from '../../../client/src'
import {useEffect} from 'react'

interface MailPressTemplate {
  id: string
  description: string
  subject?: string | null
  from?: string | null
  replyTo?: string | null
  updatedAt: string
  createdAt: string
}

const SkeletonRow = () => (
  <Tr>
    {[...Array(6)].map((_, index) => (
      <Td key={index}>
        <Skeleton height="6" />
      </Td>
    ))}
  </Tr>
)

const Page: React.FC = () => {
  const {prompt, toast} = useNotificationsContext()

  // const [templates, setTemplates] = useState<MailPressTemplate[]>([])
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   // mock data
  //   const load = async () => {
  //     const [data, errors] = await sq.query(q => {
  //       return q.mailpressAllTemplate.map(t => {
  //         return {
  //           id: t.id,
  //           description: t.description,
  //           subject: t.envelope?.subject,
  //           from: t.envelope?.from?.value,
  //           replyTo: t.envelope?.replyTo?.value,
  //           updatedAt: t.updatedAt,
  //           createdAt: t.createdAt
  //         }
  //       })
  //     })

  //     if (errors?.length) {
  //       toast({
  //         title: 'Error',
  //         description: 'Failed to load templates'
  //       })
  //     } else {
  //       setTemplates(data)
  //     }

  //     setIsLoading(false)
  //   }

  //   load()
  // }, [])

  const {data, error, isLoading, refetch} = useQuery(sq)

  useEffect(() => {
    if (error) {
      console.log('error', error)
      toast({
        title: 'Failed to load templates',
        description: (error as any)[0].message,
        status: 'error'
      })
    }
  }, [error])

  const handleAddTemplateClick = async () => {
    const description = await prompt({
      title: 'Add Template',
      message: 'Please enter a description for the new template'
    })

    if (description) {
      const [data, errors] = await sq.mutate(m => {
        return m.templateCreate({
          data: {
            description: description,
            content: 'Hello!',
            variables: [],
            envelope: {
              subject: 'Hello!'
            }
          }
        })
      })
      if (errors) {
        toast({
          title: 'Failed to create template',
          description: errors[0]!.message,
          status: 'error'
        })
      } else {
        refetch()
      }
    }
  }

  return (
    <>
      <Stack spacing="4">
        <Heading size="md">Email Templates</Heading>

        <HStack spacing="4" justifyContent="end">
          <Button
            leftIcon={<Icon as={FaPlus} />}
            onClick={handleAddTemplateClick}>
            Add Template
          </Button>
        </HStack>

        <Table>
          <Thead position="sticky" top={0} zIndex={1} borderColor="black">
            <Tr my=".8rem">
              <Th>Description</Th>
              <Th>Subject</Th>
              <Th>To</Th>
              <Th>Reply-To</Th>
              <Th>Updated at</Th>
              <Th>Created at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            {data.allTemplate().nodes.map(template => (
              <Tr
                key={template.id}
                visibility={isLoading ? 'hidden' : 'visible'}>
                <Td>
                  <Link as={GatsbyLink} to={`./${template.id}`}>
                    {template.description}
                  </Link>
                </Td>
                <Td>{template.envelope()?.subject}</Td>
                <Td>{template.envelope()?.to}</Td>
                <Td>{template.envelope()?.replyTo}</Td>
                <Td>{template.updatedAt}</Td>
                <Td>{template.createdAt}</Td>
              </Tr>
            ))}

            {data.allTemplate().nodes.length === 0 && (
              <Tr visibility={isLoading ? 'hidden' : 'visible'}>
                <Td colSpan={6}>No templates found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Stack>
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Templates',
  icon: 'FaEnvelope',
  menu: {
    type: 'app',
    group: 'mailpress',
    groupLabel: 'Mailpress',
    order: 500
  },
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

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`

export {Head} from '@atsnek/jaen'
