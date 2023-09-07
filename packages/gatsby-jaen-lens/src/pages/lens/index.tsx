import {
  PageConfig,
  useAuthenticationContext,
  useNotificationsContext
} from '@atsnek/jaen'
import {
  Button,
  Heading,
  HStack,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import {getTokenPair, sq as origin} from '@snek-functions/origin'
import {graphql, Link as GatsbyLink} from 'gatsby'
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
  const {isAuthenticated, user} = useAuthenticationContext()
  const {toast} = useNotificationsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<LensService[]>([])

  const isAdmin = user?.isAdmin

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
    // refresh by calling userMe on origin
    const [_, errors] = await origin.query(q => q.userMe.id)

    if (errors) {
      toast({
        title: 'Error',
        description:
          'Failed to refresh token. This is likely a bug or a network issue. Please try again later.',
        status: 'error'
      })
      return
    }

    const {accessToken} = getTokenPair()

    try {
      const [data, errors] = await sq.mutate(
        m => {
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
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

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

      <HStack spacing="4" justifyContent="end">
        {isAuthenticated && (
          <Link as={GatsbyLink} to="/lens/password">
            Change password
          </Link>
        )}
        {isAdmin && (
          <Button
            variant="outline"
            leftIcon={<FaEdit />}
            onClick={() => {
              setIsEditing(!isEditing)
            }}>
            {isEditing ? 'Done' : 'Edit'}
          </Button>
        )}
      </HStack>

      <Table>
        <Thead>
          <Tr>
            <Th>Service</Th>
            <Th>Host</Th>
            <Th>Port</Th>
            {isEditing && <Th>Order</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>Loading...</Td>
            </Tr>
          )}

          {services
            .sort((a, b) => {
              const aOrder = a.meta?.order ?? 0
              const bOrder = b.meta?.order ?? 0

              return aOrder - bOrder
            })
            .map(service => (
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

                {isEditing && (
                  <Td maxW="24">
                    <NumberInput
                      defaultValue={service.meta?.order}
                      onChange={(value: string) => {
                        updateService(service.id, {
                          meta: {
                            order: parseInt(value)
                          }
                        })
                      }}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                )}
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
