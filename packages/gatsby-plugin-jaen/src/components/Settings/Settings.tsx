import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList
} from '@chakra-ui/react'

import {Controller, useForm} from 'react-hook-form'
import {FaTrash} from 'react-icons/fa'
import {FieldGroup} from '../../components/shared/FieldGroup'
import FormMediaChooser from '../../containers/form-media-chooser'
import {AccountForm} from './components/AccountForm'
import {AccountFormData} from './components/AccountForm/AccountForm'
import {EmailForm} from './components/EmailForm'
import {EmailFormData} from './components/EmailForm/EmailForm'
import {PasswordForm} from './components/PasswordForm'
import {PasswordFormData} from './components/PasswordForm/PasswordForm'

interface FormDataType {
  username?: string
  details?: {
    firstName?: string
    lastName?: string
    avatarURL?: string
  }
  emails?: Array<{
    id: string
    emailAddress: string
    isVerified?: boolean
    isPrimary?: boolean
  }>
  image?: string
}

export interface SettingsProps {
  data: FormDataType

  onAccountFormSubmit: (data: AccountFormData) => Promise<void>
  onEmailFormSubmit: (data: EmailFormData) => Promise<void>
  onEmailRemove: (emailId: string) => Promise<void>
  onEmailConfirmationResend: (emailId: string) => Promise<void>
  onPasswordFormSubmit: (data: PasswordFormData) => Promise<void>
}

export const Settings: React.FC<SettingsProps> = props => {
  const handleAccountFormSubmit = async (data: AccountFormData) => {
    console.log('Account form data:', data)
    // Add logic to handle account form submission

    await props.onAccountFormSubmit(data)
  }

  const handleEmailFormSubmit = async (data: EmailFormData) => {
    console.log('Email form data:', data)
    // Add logic to handle email form submission

    await props.onEmailFormSubmit(data)
  }

  const handleEmailRemove = async (emailId: string) => {
    console.log('Remove email:', emailId)
    // Add logic to handle email removal

    await props.onEmailRemove(emailId)
  }

  const handleEmailConfirmationResend = async (emailId: string) => {
    console.log('Resend email confirmation:', emailId)
    // Add logic to handle email confirmation resend

    await props.onEmailConfirmationResend(emailId)
  }

  const handlePasswordFormSubmit = async (data: PasswordFormData) => {
    console.log('Password form data:', data)
    // Add logic to handle password form submission

    await props.onPasswordFormSubmit(data)
  }

  return (
    <Stack spacing="4" divider={<StackDivider />} px={{base: '4', md: '10'}}>
      <Heading size="sm">Settings</Heading>

      <AccountForm
        onSubmit={handleAccountFormSubmit}
        defaultValues={{
          firstName: props.data.details?.firstName,
          lastName: props.data.details?.lastName,
          avatarURL: props.data.details?.avatarURL,
          username: props.data.username
        }}
      />
      <EmailForm
        onSubmit={handleEmailFormSubmit}
        onRemove={handleEmailRemove}
        onResendVerification={handleEmailConfirmationResend}
        defaultValues={{emails: props.data.emails || []}}
      />
      <PasswordForm
        onSubmit={handlePasswordFormSubmit}
        passwordResetPath="/password_reset"
      />
    </Stack>
  )

  // return (
  //   <>
  //     <Stack spacing="4" divider={<StackDivider />} px={{base: '4', md: '10'}}>
  //       <Heading size="sm">Settings</Heading>

  //       <FieldGroup title="Account">
  //         <Stack width="full" spacing="6">
  //           <HStack>
  //             <FormControl
  //               id="firstName"
  //               isInvalid={!!errors.details?.firstName}>
  //               <FormLabel>First Name</FormLabel>
  //               <Input
  //                 placeholder=""
  //                 {...register('details.firstName', {
  //                   required: 'This field is required'
  //                 })}
  //               />
  //               <FormErrorMessage>
  //                 {errors.details?.firstName &&
  //                   errors.details.firstName.message}
  //               </FormErrorMessage>
  //             </FormControl>

  //             <FormControl id="lastName" isInvalid={!!errors.details?.lastName}>
  //               <FormLabel>Last Name</FormLabel>
  //               <Input
  //                 placeholder=""
  //                 {...register('details.lastName', {
  //                   required: 'This field is required'
  //                 })}
  //               />
  //               <FormErrorMessage>
  //                 {errors.details?.lastName && errors.details.lastName.message}
  //               </FormErrorMessage>
  //             </FormControl>
  //           </HStack>

  //           <FormControl id="username" isInvalid={!!errors.username}>
  //             <FormLabel>Username</FormLabel>
  //             <Input
  //               placeholder=""
  //               {...register('username', {
  //                 required: 'This field is required'
  //               })}
  //               autoComplete="false"
  //             />
  //             <FormErrorMessage>
  //               {errors.username && errors.username.message}
  //             </FormErrorMessage>
  //           </FormControl>

  //           <FormControl id="image">
  //             <FormLabel>Image</FormLabel>

  //             <Controller
  //               control={control}
  //               name="image"
  //               render={({field: {value}}) => {
  //                 return (
  //                   <FormMediaChooser
  //                     value={value}
  //                     onChoose={media => {
  //                       setValue('image', media.url, {
  //                         shouldDirty: true
  //                       })
  //                     }}
  //                     onRemove={() => {
  //                       setValue('image', '', {
  //                         shouldDirty: true
  //                       })
  //                     }}
  //                     description="Upload a profile picture to make your account easier to recognize."
  //                     isDirect
  //                   />
  //                 )
  //               }}
  //             />
  //           </FormControl>
  //         </Stack>
  //       </FieldGroup>

  //       <FieldGroup title="Emails">
  //         <Card>
  //           <CardBody>
  //             <Stack divider={<StackDivider />} spacing="4">
  //               {[
  //                 {
  //                   id: 'email-1',
  //                   emailAddress: 'schett@snek.at',
  //                   isVerified: true,
  //                   isPrimary: true
  //                 },
  //                 {
  //                   id: 'email-2',
  //                   emailAddress: 'nicoschett@icloud.com'
  //                 }
  //               ].map(email => {
  //                 return (
  //                   <Stack key={email.id}>
  //                     <HStack justify="space-between">
  //                       <HStack>
  //                         <Text fontSize="sm" fontWeight="bold">
  //                           {email.emailAddress}
  //                         </Text>
  //                         -{' '}
  //                         <Text>
  //                           {email.isPrimary && (
  //                             <>
  //                               -{'  '}
  //                               <Text fontSize="sm" as="span" color="green.500">
  //                                 Primary
  //                               </Text>
  //                             </>
  //                           )}
  //                         </Text>
  //                       </HStack>
  //                       <IconButton
  //                         size="xs"
  //                         aria-label="Delete email address"
  //                         variant="ghost"
  //                         color="red.500"
  //                         icon={<FaTrash />}
  //                       />
  //                     </HStack>

  //                     <UnorderedList>
  //                       {email.isPrimary && (
  //                         <ListItem fontSize="sm" color="muted">
  //                           Primary email addresses are used for account-related
  //                           communications (e.g. password resets).
  //                         </ListItem>
  //                       )}

  //                       {!email.isVerified && (
  //                         <ListItem fontSize="sm" color="muted">
  //                           <HStack>
  //                             <Text>Unverified</Text>
  //                             <Button variant="link">
  //                               Resend verification email
  //                             </Button>
  //                           </HStack>
  //                         </ListItem>
  //                       )}
  //                     </UnorderedList>
  //                   </Stack>
  //                 )
  //               })}
  //             </Stack>
  //           </CardBody>
  //         </Card>
  //       </FieldGroup>

  //       <FieldGroup title="Password">
  //         <Stack width="full" spacing="6">
  //           <FormControl id="password">
  //             <FormLabel>Password</FormLabel>
  //             <Input
  //               placeholder=""
  //               type="password"
  //               autoComplete="new-password"
  //             />
  //           </FormControl>

  //           <FormControl id="confirmPassword">
  //             <FormLabel>Confirm Password</FormLabel>
  //             <Input
  //               placeholder=""
  //               type="password"
  //               autoComplete="new-password"
  //             />
  //           </FormControl>

  //           {
  //             // update password or forgot password link
  //           }
  //           <Stack>
  //             <Text fontSize="sm" color="muted">
  //               Make sure your password is at least 15 characters OR at least 8
  //               characters including a number and a lowercase letter.
  //             </Text>

  //             <ButtonGroup>
  //               <Button
  //                 isLoading={isSubmitting}
  //                 type="submit"
  //                 variant="outline">
  //                 Update password
  //               </Button>
  //               <Button isLoading={isSubmitting} type="submit" variant="link">
  //                 I forgot my password
  //               </Button>
  //             </ButtonGroup>
  //           </Stack>
  //         </Stack>
  //       </FieldGroup>
  //     </Stack>
  //   </>
  // )
}
