import {PageConfig, useNotificationsContext} from '@atsnek/jaen'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {graphql} from 'gatsby'
import {useEffect, useState} from 'react'
import {FaEdit} from 'react-icons/fa'
import * as SIIcons from 'react-icons/si'

import {sq} from '../../clients/lens/src'
import {
  LensService,
  LensServiceMetaInput
} from '../../clients/lens/src/schema.generated'
import {IconChooser} from '../../components/IconChooser'

const Page: React.FC = () => {
  const {toast} = useNotificationsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<LensService[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true)

        const [data, errors] = await sq.query(q =>
          q.allService.map(m => {
            return {
              id: m.id,
              fqdn: m.fqdn,
              host: m.host,
              port: m.port,
              meta: m.meta,
              isSecure: m.isSecure,
              __typename: m.__typename
            }
          })
        )
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

  const updateService = async (
    id: string,
    inputData: {
      meta: LensServiceMetaInput
    }
  ): Promise<void> => {
    try {
      const [data, errors] = await sq.mutate(m => {
        const service = m.serviceUpdate({
          id,
          meta: inputData.meta
        })

        return {
          id: service?.id,
          fqdn: service?.fqdn,
          host: service?.host,
          port: service?.port,
          meta: service?.meta,
          isSecure: service?.isSecure,
          __typename: service?.__typename
        }
      })
      if (errors) {
        throw new Error(errors[0]?.message)
      }

      setServices(services => {
        const service = services.find(s => s.id === data?.id)

        if (!service) {
          throw new Error('Service not found')
        }

        return services.map(s => {
          if (s.id === service.id) {
            return {
              ...s,
              ...(data as LensService)
            }
          }

          return s
        })
      })

      const service = services.find(s => s.id === data?.id)

      if (!service) {
        throw new Error('Service not found')
      }

      const label = service?.meta?.label || service?.id

      toast({
        title: 'Service updated',
        description: `Service ${label} has been updated`,
        status: 'success'
      })
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error'
      })
    }
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
                <HStack>
                  <IconChooser
                    icon={service.meta?.icon as keyof typeof SIIcons}
                    isEditing={isEditing}
                    setIcon={(icon: string) => {
                      updateService(service.id, {
                        meta: {
                          icon
                        }
                      })
                    }}
                  />

                  {isEditing ? (
                    <Input
                      defaultValue={service.meta?.label || service.id}
                      onBlur={e => {
                        updateService(service.id, {
                          meta: {
                            label: e.target.value
                          }
                        })
                      }}
                    />
                  ) : (
                    <Link isExternal href={`https://${service.fqdn}`}>
                      {service.meta?.label || service.id}
                    </Link>
                  )}
                </HStack>
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
    name: 'jaen'
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
