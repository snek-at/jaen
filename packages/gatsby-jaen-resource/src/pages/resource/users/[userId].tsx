import {PageConfig, PageProps, useNotificationsContext} from '@atsnek/jaen'
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Switch,
  Text
} from '@chakra-ui/react'
import {navigate} from 'gatsby'
import {forwardRef, useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'

import {useUser, useUsers} from '../../../hooks'

type FormValues = {
  emailAddress: string
  details?: {
    avatarURL?: string
    firstName?: string
    lastName?: string
  }
  username: string
  isActive: boolean
  isAdmin: boolean
  password?: string
}

const PasswordInput = forwardRef<HTMLInputElement, any>(
  ({register, ...props}, ref) => {
    const [show, setShow] = useState(false)
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

const Page: React.FC<PageProps> = props => {
  const userId = props.params.userId ?? ''
  const {user, isLoading} = useUser(userId)
  const {updateUser, deleteUser} = useUsers()
  const [changePasword, setChangePassword] = useState(false)

  const defaultValues = user
    ? {
        emailAddress: user.primaryEmailAddress,
        details: {
          firstName: user.details?.firstName,
          lastName: user.details?.lastName
        },
        username: user.username,
        isActive: user.isActive,
        isAdmin: user.isAdmin
      }
    : {}

  console.log('defaultValues', defaultValues)

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: {errors, isSubmitting, isDirty, isValid}
  } = useForm<FormValues>({
    defaultValues
  })

  const {confirm} = useNotificationsContext()

  const handleDelete = async () => {
    const ok = await confirm({
      title: 'Delete user',
      message: "Are you sure? You can't undo this action afterwards.",
      confirmText: 'Delete',
      cancelText: 'Cancel'
    })

    if (ok) {
      const success = await deleteUser(userId)

      if (success) {
        navigate(-1)
      }
    }
  }

  const onReset = () => {
    reset(defaultValues)

    setChangePassword(false)
  }

  useEffect(() => {
    onReset()
  }, [user])

  const onSubmit = async (values: FormValues) => {
    // Get diff between old and new values typescript

    const diff: any = {}

    Object.keys(values).forEach(key => {
      if ((values as any)[key] !== (defaultValues as any)[key]) {
        diff[key] = (values as any)[key]
      }
    })

    const success = await updateUser(userId, diff)

    if (success) {
      navigate(-1)

      reset(values)
      setChangePassword(false)
    }
  }

  if (!user && !isLoading) {
    return <Text>User not found</Text>
  }

  return (
    <Box>
      <HStack>
        {/* <SkeletonCircle isLoaded={!isLoading}>
          <Avatar name={user?.username ?? ''} src={user?.details?.avatarURL} />
        </SkeletonCircle>

        <Stack>
          <SkeletonText isLoaded={!isLoading}>
            <Text fontSize="2xl">{user?.username}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={!isLoading}>
            <Text fontSize="md">{user?.primaryEmailAddress}</Text>
          </SkeletonText>
        </Stack> */}
      </HStack>

      <Card mt={8} p={4}>
        <Stack>
          <HStack>
            <Avatar name={user?.username} src={user?.details?.avatarURL} />
            <Stack spacing="0.5">
              <Text fontWeight="bold" lineHeight="none">
                {user?.username} ({user?.primaryEmailAddress})
              </Text>
              <Text color="muted" lineHeight="none">
                {user?.details?.firstName} {user?.details?.lastName}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt={4}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>ID</FormLabel>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Input placeholder={user?.id} disabled />
          </Skeleton>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.emailAddress}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>E-Mail</FormLabel>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Input
              isDisabled
              placeholder="john.doe@snek.at"
              {...register('emailAddress', {
                required: 'This is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
          </Skeleton>
          <FormErrorMessage>{errors.emailAddress?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.username}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>Username</FormLabel>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Input
              placeholder="john.doe"
              {...register('username', {
                required: 'This is required'
              })}
            />
          </Skeleton>
          <FormErrorMessage>
            {errors.details?.firstName?.message}
          </FormErrorMessage>
        </FormControl>

        <Stack direction="row">
          <Flex flex={1}>
            <FormControl mt={4} isInvalid={!!errors.details?.lastName}>
              <Skeleton width={'fit-content'} isLoaded={!isLoading}>
                <FormLabel>Firstname</FormLabel>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Input
                  placeholder="John"
                  {...register('details.firstName', {})}
                />
              </Skeleton>
              <FormErrorMessage>
                {errors.details?.lastName?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex flex={1}>
            <FormControl mt={4} isInvalid={!!errors.details?.lastName}>
              <Skeleton width={'fit-content'} isLoaded={!isLoading}>
                <FormLabel>Lastname</FormLabel>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Input
                  width={'full'}
                  placeholder="Doe"
                  {...register('details.lastName', {})}
                />
              </Skeleton>
              <FormErrorMessage>
                {errors.details?.lastName?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </Stack>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>Password</FormLabel>
          </Skeleton>
          {changePasword ? (
            <Skeleton isLoaded={!isLoading}>
              <PasswordInput
                {...register('password', {
                  required: 'This is required',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
                  }
                })}
              />
            </Skeleton>
          ) : (
            <Skeleton width={'fit-content'} isLoaded={!isLoading}>
              <Button onClick={() => setChangePassword(true)}>Change </Button>
            </Skeleton>
          )}
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.isActive}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>Active</FormLabel>
          </Skeleton>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <Controller
              control={control}
              name="isActive"
              defaultValue={user?.isActive}
              render={({field: {value, onChange, onBlur, ref}}) => (
                <Switch
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  isChecked={value}
                />
              )}
            />
          </Skeleton>
          <FormErrorMessage>{errors.isActive?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.isAdmin}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>Admin</FormLabel>
          </Skeleton>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <Controller
              control={control}
              name="isAdmin"
              defaultValue={user?.isAdmin}
              render={({field: {value, onChange, onBlur, ref}}) => (
                <Switch
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  isChecked={value}
                />
              )}
            />
          </Skeleton>
          <FormErrorMessage>{errors.isAdmin?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mt={4}>
          <Skeleton width={'fit-content'} isLoaded={!isLoading}>
            <FormLabel>Created at</FormLabel>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Input
              placeholder={new Date(user?.createdAt ?? 0).toDateString()}
              disabled
            />
          </Skeleton>
        </FormControl>

        <Box mt={8}>
          <HStack width="full">
            <ButtonGroup isDisabled={!isDirty}>
              <Skeleton width={'fit-content'} isLoaded={!isLoading}>
                <Button type="submit" isLoading={isSubmitting}>
                  Save Changes
                </Button>
              </Skeleton>
              <Skeleton width={'fit-content'} isLoaded={!isLoading}>
                <Button variant="outline" onClick={onReset}>
                  Cancel
                </Button>
              </Skeleton>
            </ButtonGroup>
            <Skeleton width={'fit-content'} isLoaded={!isLoading}>
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </Skeleton>
          </HStack>
        </Box>
      </form>
    </Box>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'Update user',
  icon: 'FaUserCog',
  layout: {
    name: 'jaen',
    type: 'form'
  },
  breadcrumbs: [
    {
      label: 'Resource',
      path: '/resource/'
    },
    {
      label: 'Users',
      path: '/resource/users/'
    },
    {
      label: 'Update user',
      path: '/resource/users/'
    }
  ],
  auth: {
    isRequired: true,
    isAdminRequired: true
  }
}
