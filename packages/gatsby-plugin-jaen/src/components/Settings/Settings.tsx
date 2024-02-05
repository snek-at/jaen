import {
  AuthUser,
  useNotificationsContext,
  AuthPasswordPolicy
} from '@atsnek/jaen'
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react'
import {FaEdit} from '@react-icons/all-files/fa/FaEdit'
import {FaPlus} from '@react-icons/all-files/fa/FaPlus'
import {FaTrash} from '@react-icons/all-files/fa/FaTrash'
import {FaCheck} from '@react-icons/all-files/fa6/FaCheck'
import {FaX} from '@react-icons/all-files/fa6/FaX'
import {MdRefresh} from '@react-icons/all-files/md/MdRefresh'
import {useEffect, useState} from 'react'

export interface SettingsProps {
  user: AuthUser
  passwordPolicy: AuthPasswordPolicy

  onUsernameUpdate: (userName: string) => Promise<void>

  onProfileUpdate: (profile: AuthUser['human']['profile']) => Promise<void>

  onProfileAvatarUpdate: (avatarFile: File) => Promise<void>

  onContactInformationRefresh: () => Promise<void>

  onEmailUpdate: (email: string) => Promise<void>
  onEmailResendCode: () => Promise<void>
  onphoneUpdate: (phone: string) => Promise<void>
  onphoneDelete: () => Promise<void>
  onphoneVerify: (code: string) => Promise<void>
  onphoneResendCode: () => Promise<void>
  onPasswordUpdate: (oldPassword: string, newPassword: string) => Promise<void>
}

type TabType = {
  label: string
  value: 'GENERAL' | 'PASSWD'
}

const TABS: TabType[] = [
  {
    label: 'General',
    value: 'GENERAL'
  },
  {
    label: 'Password & Security',
    value: 'PASSWD'
  }
]

// GENDER_UNSPECIFIED, GENDER_FEMALE, GENDER_MALE, GENDER_DIVERSE
const genderOptions = {
  GENDER_UNSPECIFIED: 'Unspecified',
  GENDER_MALE: 'Male',
  GENDER_FEMALE: 'Female',
  GENDER_DIVERSE: 'Other'
}

const localOptions = {
  de: 'German',
  en: 'English'
}

export const Settings: React.FC<SettingsProps> = props => {
  const query = new URLSearchParams(window.location.search)
  const initialTab = query.get('activeTab') || 'GENERAL' // replace 'GENERAL' with your default tab value

  console.log('settings', props)

  const notify = useNotificationsContext()

  const [user, setUser] = useState(props.user)

  useEffect(() => {
    setUser(props.user)
  }, [props.user])

  const [activeTab, setActiveTab] = useState<TabType['value']>(
    initialTab as TabType['value']
  )

  const handleTabChange = (tab: TabType['value']) => {
    setActiveTab(tab)
    // Toggle password if the tab is changed
    setIsChangingPassword(false)

    // Update the query parameters
    query.set('activeTab', tab)
    // navigate(window.location.pathname + '?' + query.toString())
  }

  const [isProfileUpdating, setIsProfileUpdating] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProfileUpdating(true)
    // Update profile information on form submission
    await props.onProfileUpdate(user.human.profile)
    setIsProfileUpdating(false)
  }

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword)
  }

  const [isProfileAvatarUpdating, setIsProfileAvatarUpdating] = useState(false)

  const handleProfileAvatarUpdate = async (avatarFile: File) => {
    setIsProfileAvatarUpdating(true)
    await props.onProfileAvatarUpdate(avatarFile)
    setIsProfileAvatarUpdating(false)
  }

  const [isUsernameChanging, setIsUsernameChanging] = useState(false)

  const handleUsernameChange = async () => {
    const userName = await notify.prompt({
      title: 'Change Username',
      message: 'Please enter your new username'
    })

    if (userName) {
      // update username
      setIsUsernameChanging(true)
      await props.onUsernameUpdate(userName)
      setIsUsernameChanging(false)
    }
  }

  const [isEmailChanging, setIsEmailChanging] = useState(false)

  const handleEmailChange = async () => {
    const email = await notify.prompt({
      title: 'Change Email',
      message: 'Please enter your new email'
    })

    if (email) {
      // update email
      setIsEmailChanging(true)
      await props.onEmailUpdate(email)
      setIsEmailChanging(false)
    }
  }

  const [isEmailResendingCode, setIsEmailResendingCode] = useState(false)

  const handleEmailResendCode = async () => {
    setIsEmailResendingCode(true)

    await props.onEmailResendCode()

    setIsEmailResendingCode(false)
  }

  const [isPhoneChanging, setIsPhoneChanging] = useState(false)

  const handlePhoneChange = async () => {
    const phone = await notify.prompt({
      title: 'Change Phone Number',
      message: 'Please enter your new phone number'
    })

    if (phone) {
      // update phone number
      setIsPhoneChanging(true)
      await props.onphoneUpdate(phone)
      setIsPhoneChanging(false)
    }
  }

  const [isPhoneDeleting, setIsPhoneDeleting] = useState(false)

  const handlephoneDelete = async () => {
    const confirm = await notify.confirm({
      title: 'Delete Phone Number',
      message: 'Are you sure you want to delete your phone number?'
    })

    if (confirm) {
      // delete phone number
      setIsPhoneDeleting(true)
      await props.onphoneDelete()
      setIsPhoneDeleting(false)
    }
  }

  const [isPhoneVerifying, setIsPhoneVerifying] = useState(false)

  const handlephoneVerify = async () => {
    const code = await notify.prompt({
      title: 'Verify Phone Number',
      message: 'Please enter the verification code'
    })

    if (code) {
      // verify phone number
      setIsPhoneVerifying(true)
      await props.onphoneVerify(code)
      setIsPhoneVerifying(false)
    }
  }

  const [isPhoneResendingCode, setIsPhoneResendingCode] = useState(false)

  const handlephoneResendCode = async () => {
    setIsPhoneResendingCode(true)

    await props.onphoneResendCode()

    setIsPhoneResendingCode(false)
  }

  const [isPasswordChanging, setIsPasswordChanging] = useState(false)

  const handlePasswordChange = async () => {
    setIsPasswordChanging(true)
    await props.onPasswordUpdate(currentPassword, password)
    setIsPasswordChanging(false)
  }

  const [isContactInformationRefreshing, setIsContactInformationRefreshing] =
    useState(false)

  const handleContactInformationRefresh = async () => {
    setIsContactInformationRefreshing(true)
    await props.onContactInformationRefresh()
    setIsContactInformationRefreshing(false)
  }

  return (
    <Grid templateColumns={{base: '1fr', md: '15% 85%'}} gap={4}>
      <GridItem>
        <VStack>
          {TABS.map(tab => (
            <Button
              w="full"
              justifyContent="left"
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              variant="ghost"
              color={tab.value === activeTab ? 'brand.500' : undefined}>
              {tab.label}
            </Button>
          ))}
        </VStack>
      </GridItem>
      <GridItem>
        {activeTab === 'GENERAL' && (
          <Stack spacing="8">
            <Card>
              <CardHeader fontWeight="bold" fontSize="lg">
                Profile
              </CardHeader>
              <CardBody>
                <Stack spacing="6">
                  <HStack spacing="6">
                    <HStack>
                      <Avatar
                        size="xl"
                        name={user.human.profile.displayName}
                        src={user.human.profile.avatarUrl}
                        cursor="pointer"
                        onClick={
                          isProfileAvatarUpdating
                            ? undefined
                            : () => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'
                                input.onchange = async e => {
                                  const file = (e.target as HTMLInputElement)
                                    .files![0]

                                  if (!file) {
                                    notify.toast({
                                      title: 'No file selected',
                                      status: 'error'
                                    })
                                    return
                                  }

                                  await handleProfileAvatarUpdate(file)
                                }
                                input.click()
                              }
                        }
                      />

                      {isProfileAvatarUpdating && (
                        <Spinner size="sm" color="brand.500" />
                      )}
                    </HStack>
                    <Stack spacing="4">
                      <FormControl id="userName">
                        <FormLabel>Username</FormLabel>
                        <HStack>
                          <Input
                            isDisabled
                            maxW="xs"
                            autoComplete="off"
                            bg="gray.100"
                            value={user.userName}
                            onChange={e =>
                              setUser({...user, userName: e.target.value})
                            }
                          />
                          <IconButton
                            size="lg"
                            aria-label="Edit userName"
                            icon={<FaEdit />}
                            variant="ghost"
                            onClick={handleUsernameChange}
                            isLoading={isUsernameChanging}
                          />
                        </HStack>
                      </FormControl>
                    </Stack>
                  </HStack>

                  <form onSubmit={handleSubmit}>
                    <Stack spacing="6">
                      <SimpleGrid columns={{base: 1, md: 2}} spacing="6">
                        <FormControl id="firstName">
                          <FormLabel>First Name</FormLabel>
                          <Input
                            placeholder=""
                            value={user.human.profile.firstName}
                            onChange={e =>
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    firstName: e.target.value
                                  }
                                }
                              })
                            }
                          />
                        </FormControl>
                        <FormControl id="lastName">
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            placeholder=""
                            value={user.human.profile.lastName}
                            onChange={e =>
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    lastName: e.target.value
                                  }
                                }
                              })
                            }
                          />
                        </FormControl>

                        <FormControl id="nickName">
                          <FormLabel>Nickname</FormLabel>
                          <Input
                            placeholder=""
                            value={user.human.profile.nickName}
                            onChange={e =>
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    nickName: e.target.value
                                  }
                                }
                              })
                            }
                          />
                        </FormControl>

                        <FormControl id="displayName">
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            placeholder=""
                            value={user.human.profile.displayName}
                            onChange={e =>
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    displayName: e.target.value
                                  }
                                }
                              })
                            }
                          />
                        </FormControl>

                        <FormControl id="gender">
                          <FormLabel>Gender</FormLabel>
                          <Select
                            defaultValue={user.human.profile.gender}
                            onChange={e => {
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    gender: e.target.value
                                  }
                                }
                              })
                            }}>
                            {Object.entries(genderOptions).map(
                              ([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>

                        <FormControl id="preferredLanguage">
                          <FormLabel>Language</FormLabel>
                          <Select
                            defaultValue={user.human.profile.preferredLanguage}
                            onChange={e => {
                              setUser({
                                ...user,
                                human: {
                                  ...user.human,
                                  profile: {
                                    ...user.human.profile,
                                    preferredLanguage: e.target.value
                                  }
                                }
                              })
                            }}>
                            {Object.entries(localOptions).map(
                              ([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </SimpleGrid>

                      <ButtonGroup>
                        <Button isLoading={isProfileUpdating} type="submit">
                          Save
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </form>
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader fontWeight="bold" fontSize="lg">
                <HStack justifyContent="space-between">
                  <Text>Contact Information</Text>
                  <IconButton
                    size="lg"
                    aria-label="Refresh"
                    icon={<MdRefresh />}
                    variant="ghost"
                    onClick={handleContactInformationRefresh}
                    isLoading={isContactInformationRefreshing}
                  />
                </HStack>
              </CardHeader>
              <CardBody>
                <Text fontSize="sm" color="gray.600">
                  The provided information is used to send important
                  information, like password reset e-mails to you.
                </Text>
                <Stack divider={<StackDivider />} spacing="6" my="4">
                  <FormControl id="email">
                    <HStack justifyContent="space-between">
                      <FormLabel>Email</FormLabel>
                      <IconButton
                        size="lg"
                        aria-label="Edit email"
                        icon={<FaEdit />}
                        variant="ghost"
                        onClick={handleEmailChange}
                        isLoading={isEmailChanging}
                      />
                    </HStack>
                    <Text mt="2">{user.human.email.email}</Text>

                    <HStack>
                      <Text
                        fontSize="sm"
                        color={
                          user.human.email.isEmailVerified
                            ? 'green.500'
                            : 'red.500'
                        }>
                        {user.human.email.isEmailVerified
                          ? 'Verified'
                          : 'Not verified'}
                      </Text>

                      {!user.human.email.isEmailVerified && (
                        <>
                          <Button
                            variant="link"
                            color="fg.subtle"
                            fontWeight="normal"
                            onClick={handleEmailResendCode}
                            isLoading={isEmailResendingCode}>
                            Resend Code
                          </Button>
                        </>
                      )}
                    </HStack>
                  </FormControl>

                  <FormControl>
                    {user.human.phone.phone ? (
                      <>
                        <HStack justifyContent="space-between">
                          <FormLabel>Phone number</FormLabel>
                          <HStack>
                            <IconButton
                              size="lg"
                              aria-label="Delete phone number"
                              icon={<Icon as={FaTrash} color="red.500" />}
                              variant="ghost"
                              colorScheme="red"
                              onClick={handlephoneDelete}
                              isLoading={isPhoneDeleting}
                            />
                            <IconButton
                              size="lg"
                              aria-label="Edit phone number"
                              icon={<FaEdit />}
                              variant="ghost"
                              onClick={handlePhoneChange}
                              isLoading={isPhoneChanging}
                            />
                          </HStack>
                        </HStack>
                        <Text mt="2">{user.human.phone.phone}</Text>

                        <HStack>
                          <Text
                            fontSize="sm"
                            color={
                              user.human.phone.isPhoneVerified
                                ? 'green.500'
                                : 'red.500'
                            }>
                            {user.human.phone.isPhoneVerified
                              ? 'Verified'
                              : 'Not verified'}
                          </Text>

                          {!user.human.phone.isPhoneVerified && (
                            <>
                              <Button
                                variant="link"
                                color="fg.subtle"
                                fontWeight="normal"
                                onClick={handlephoneVerify}
                                isLoading={isPhoneVerifying}>
                                Verify
                              </Button>

                              <Button
                                variant="link"
                                color="fg.subtle"
                                fontWeight="normal"
                                onClick={handlephoneResendCode}
                                isLoading={isPhoneResendingCode}>
                                Resend Code
                              </Button>
                            </>
                          )}
                        </HStack>
                      </>
                    ) : (
                      <>
                        <HStack justifyContent="space-between">
                          <FormLabel>Phone number</FormLabel>
                          <IconButton
                            size="lg"
                            aria-label="Add phone number"
                            icon={<FaPlus />}
                            variant="ghost"
                            onClick={handlePhoneChange}
                            isLoading={isPhoneChanging}
                          />
                        </HStack>
                        <Text mt="2">No phone number provided</Text>
                      </>
                    )}
                  </FormControl>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        )}

        {activeTab === 'PASSWD' && (
          <Card>
            <CardHeader fontWeight="bold" fontSize="lg">
              Password
            </CardHeader>

            <CardBody>
              {isChangingPassword ? (
                <Stack spacing="6">
                  <FormLabel>
                    Enter the new password according to the policy below.
                  </FormLabel>
                  <FormControl>
                    <FormLabel>Current Password</FormLabel>
                    <Input
                      maxW="md"
                      type="password"
                      placeholder="New password"
                      onChange={e => setCurrentPassword(e.target.value)}
                    />
                  </FormControl>

                  <List spacing={3}>
                    {props.passwordPolicy.minLength && (
                      <ListItem>
                        {password.length >= props.passwordPolicy.minLength ? (
                          <ListIcon as={FaCheck} color="green.500" />
                        ) : (
                          <ListIcon as={FaX} color="red.500" />
                        )}
                        Has to be at least {props.passwordPolicy.minLength}{' '}
                        characters long. ({password.length} /{' '}
                        {props.passwordPolicy.minLength})
                      </ListItem>
                    )}
                    {props.passwordPolicy.hasSymbol && (
                      <ListItem>
                        {/[\p{P}\p{S}]/u.test(password) ? (
                          <ListIcon as={FaCheck} color="green.500" />
                        ) : (
                          <ListIcon as={FaX} color="red.500" />
                        )}
                        Must include a symbol or punctuation mark.
                      </ListItem>
                    )}

                    {props.passwordPolicy.hasNumber && (
                      <ListItem>
                        {/\d/.test(password) ? (
                          <ListIcon as={FaCheck} color="green.500" />
                        ) : (
                          <ListIcon as={FaX} color="red.500" />
                        )}
                        Must include a number.
                      </ListItem>
                    )}

                    {props.passwordPolicy.hasUppercase && (
                      <ListItem>
                        {/[A-Z]/.test(password) ? (
                          <ListIcon as={FaCheck} color="green.500" />
                        ) : (
                          <ListIcon as={FaX} color="red.500" />
                        )}
                        Must include an uppercase letter.
                      </ListItem>
                    )}

                    {props.passwordPolicy.hasLowercase && (
                      <ListItem>
                        {/[a-z]/.test(password) ? (
                          <ListIcon as={FaCheck} color="green.500" />
                        ) : (
                          <ListIcon as={FaX} color="red.500" />
                        )}
                        Must include a lowercase letter.
                      </ListItem>
                    )}

                    <ListItem>
                      {password && password === passwordConfirmation ? (
                        <ListIcon as={FaCheck} color="green.500" />
                      ) : (
                        <ListIcon as={FaX} color="red.500" />
                      )}
                      Passwords match.
                    </ListItem>
                  </List>

                  <HStack>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="New password"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        onChange={e => setPasswordConfirmation(e.target.value)}
                      />
                    </FormControl>
                  </HStack>

                  <ButtonGroup>
                    <Button
                      isLoading={isPasswordChanging}
                      type="submit"
                      onClick={handlePasswordChange}>
                      Reset Current Password
                    </Button>
                    <Button variant="outline" onClick={togglePasswordChange}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Stack>
              ) : (
                <FormControl>
                  <HStack justifyContent="space-between">
                    <FormLabel>
                      A secure password helps to protect the account
                    </FormLabel>
                    <IconButton
                      size="lg"
                      aria-label="Edit email"
                      icon={<FaEdit />}
                      variant="ghost"
                      onClick={togglePasswordChange}
                      isLoading={isPasswordChanging}
                    />
                  </HStack>
                  <Text mt="2">*********</Text>
                </FormControl>
              )}
            </CardBody>
          </Card>
        )}
      </GridItem>
    </Grid>
  )
}
