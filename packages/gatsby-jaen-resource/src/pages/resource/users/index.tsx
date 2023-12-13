import {PageConfig} from '@atsnek/jaen'

import {FaPlus} from '@react-icons/all-files/fa/FaPlus'
import {FaCheckCircle} from '@react-icons/all-files/fa/FaCheckCircle'
import {FaEdit} from '@react-icons/all-files/fa/FaEdit'

import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Icon,
  SkeletonCircle,
  Avatar
} from '@chakra-ui/react'
import {graphql, Link as GatsbyLink} from 'gatsby'
import React from 'react'

import {Mutation} from '@snek-functions/origin/dist/schema.generated'

import {useForm} from 'react-hook-form'

import {useUsers} from '../../../hooks'

type UserCreate = Parameters<Mutation['userRegister']>[0]

const Page: React.FC = () => {
  //const { isAuthenticated, user } = useAuthenticationContext()

  const {users, isLoading} = useUsers()
  return (
    <>
      <Stack spacing="4">
        <Heading size="md">User ({users.length})</Heading>

        <HStack spacing="4" justifyContent="end">
          <AddUserControl />
        </HStack>

        <Table>
          <Thead position="sticky" top={0} zIndex={1} borderColor="black">
            <Tr my=".8rem">
              <Th></Th>
              <Th>E-Mail Address</Th>
              <Th>Username</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Created at</Th>
              <Th>Active</Th>
              <Th>Admin</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              // map with 5 rows to show loading
              [...Array(3)].map((_, index) => (
                <Tr key={index}>
                  <Td>
                    <SkeletonCircle size="10" isLoaded={!isLoading} />
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Text fontSize="sm">john.doe@snek.at</Text>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Text fontSize="sm">john.doe</Text>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Text fontSize="sm">John</Text>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Text fontSize="sm">Doe</Text>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Text fontSize="sm">Tue Jun 27 2023</Text>
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Icon as={FaCheckCircle} />
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <Icon as={FaCheckCircle} />
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton
                      w={'fit-content'}
                      h={'fit-content'}
                      isLoaded={!isLoading}>
                      <IconButton
                        as={GatsbyLink}
                        aria-label="Edit"
                        icon={<Icon as={FaEdit} />}
                        to={`/cms/user/`}
                      />
                    </Skeleton>
                  </Td>
                </Tr>
              ))}

            {users
              .map(user => (
                <Tr key={user.id}>
                  <Td>
                    <Avatar
                      size="sm"
                      name={user.username}
                      src={user.details?.avatarURL}
                    />
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.primaryEmailAddress}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.username}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.details?.firstName}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{user.details?.lastName}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {new Date(user.createdAt).toDateString()}
                    </Text>
                  </Td>
                  <Td>{user.isActive ? <Icon as={FaCheckCircle} /> : null}</Td>
                  <Td>{user.isAdmin ? <Icon as={FaCheckCircle} /> : null}</Td>
                  <Td textAlign={'right'}>
                    <IconButton
                      as={GatsbyLink}
                      aria-label="Edit"
                      icon={<Icon as={FaEdit} />}
                      to={user.id}
                    />
                  </Td>
                </Tr>
              ))
              .reverse()}
          </Tbody>
        </Table>
      </Stack>
    </>
  )
}

const PasswordInput = React.forwardRef<HTMLInputElement, any>(
  ({register, ...props}, ref) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
      <InputGroup size="md">
        <Input
          autoComplete="new-password"
          ref={ref}
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          {...props}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
)

const AddUserControl = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  //const navigate = useNavigate()

  const {addUser} = useUsers()

  const initialRef = React.useRef<HTMLInputElement | null>(null)

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<UserCreate['values']>({})

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: UserCreate['values']) => {
    const ok = await addUser(values)

    if (ok) {
      handleClose()
      //navigate(0)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add a user</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!errors.emailAddress}>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  placeholder="max.mustermann@snek.at"
                  type="email"
                  {...register('emailAddress', {
                    required: 'This is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.emailAddress?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="max.mustermann"
                  {...register('username', {
                    required: 'This is required'
                  })}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>

              <Stack direction={'row'}>
                <Flex>
                  <FormControl mt={4} isInvalid={!!errors.details?.firstName}>
                    <FormLabel>Firstname</FormLabel>
                    <Input
                      placeholder="Max"
                      {...register('details.firstName')}
                    />
                    <FormErrorMessage>
                      {errors.details?.firstName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

                <Flex>
                  <FormControl mt={4} isInvalid={!!errors.details?.lastName}>
                    <FormLabel>Lastname</FormLabel>
                    <Input
                      placeholder="Mustermann"
                      {...register('details.lastName')}
                    />
                    <FormErrorMessage>
                      {errors.details?.lastName?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Stack>

              <FormControl mt={4} isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput
                  {...register('password', {
                    required: 'This is required'
                  })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup isDisabled={!isDirty}>
                <Button type="submit" isLoading={isSubmitting}>
                  Create
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Button leftIcon={<Icon as={FaPlus} />} onClick={onOpen}>
        Add User
      </Button>
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'User',
  icon: 'FaUsersCog',
  menu: {
    type: 'app',
    group: 'resource',
    groupLabel: 'Resource',
    order: 500
  },
  layout: {
    name: 'jaen'
  },
  breadcrumbs: [
    {
      label: 'Resource',
      path: '/resource/'
    },
    {
      label: 'Users',
      path: '/resource/users/'
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
