import {
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {LensService} from 'clients/lens/src/schema.generated'
import {graphql, Link as GatsbyLink} from 'gatsby'
import {PageConfig, useNotificationsContext} from '@atsnek/jaen'
import {useEffect, useState} from 'react'
import {FaEdit} from 'react-icons/fa'

import {sq} from '../../clients/lens/src'

const Page: React.FC = () => {
  const {toast} = useNotificationsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<LensService[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)

        const [data, errors] = await sq.query(q => q.allService)
        if (errors) {
          throw new Error(errors[0]?.message)
        }

        setServices(data)
        setIsLoading(false)
      } catch (e) {
        toast({
          title: 'Error',
          description: e.message,
          status: 'error'
        })
      }
    }

    fetchServices()
  }, [])

  const updateServiceLabel = async (id: string, label: string) => {
    const [data, errors] = await sq.mutate(m =>
      m.serviceLableUpdate({id, label})
    )
    if (errors) {
      throw new Error(errors[0]?.message)
    }

    setServices(data)
  }

  const [isEditing, setIsEditing] = useState(false)

  return (
    <Stack spacing="4">
      <Heading size="md">Services ({services.length})</Heading>

      <HStack justifyContent="end">
        <Button
          variant="outline"
          leftIcon={<FaEdit />}
          onClick={() => {
            setIsEditing(!isEditing)
          }}>
          {isEditing ? 'Done' : 'Edit'}
        </Button>
      </HStack>

      <Table>
        <Thead>
          <Tr>
            <Th>Service</Th>
            <Th>Host</Th>
            <Th>Port</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>Loading...</Td>
            </Tr>
          )}

          {services.map(service => (
            <Tr key={service.id}>
              <Td>
                {isEditing ? (
                  <Input
                    defaultValue={service.label || service.id}
                    onBlur={e => {
                      updateServiceLabel(service.id, e.target.value)
                    }}
                  />
                ) : (
                  <Link isExternal href={`https://${service.fqdn}`}>
                    {service.label || service.id}
                  </Link>
                )}
              </Td>
              <Td>{service.host}</Td>
              <Td>{service.port}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Lens',
  icon: 'FaBullseye',
  menu: {
    type: 'app',
    order: 500
  },
  layout: {
    name: '@atsnek/jaen'
  },
  auth: {
    isRequired: true,
    isAdminRequired: true
  },
  breadcrumbs: [
    {
      label: 'Lens',
      path: '/lens/'
    }
  ]
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
