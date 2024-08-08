import {
  Button,
  ButtonGroup,
  FormControl, // Added FormHelperText
  FormLabel,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Stack
} from '@chakra-ui/react'
import {FaCheck} from '@react-icons/all-files/fa/FaCheck'
import {FaX} from '@react-icons/all-files/fa6/FaX'
import React, {useState} from 'react'

export interface PasswordUpdateFormProps {
  passwordPolicy: {
    minLength: number
    hasSymbol: boolean
    hasNumber: boolean
    hasUppercase: boolean
    hasLowercase: boolean
  }
  onPasswordUpdate: (currentPassword: string, password: string) => Promise<void>
}

export const PasswordUpdateForm: React.FC<PasswordUpdateFormProps> = props => {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const [isPasswordChanging, setIsPasswordChanging] = useState(false)

  const handlePasswordChange = async () => {
    setIsPasswordChanging(true)
    await props.onPasswordUpdate(currentPassword, password)
    setIsPasswordChanging(false)
  }

  return (
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
            Has to be at least {props.passwordPolicy.minLength} characters long.
            ({password.length} / {props.passwordPolicy.minLength})
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
        <Button
          variant="outline"
          onClick={() => {
            // reset
            setCurrentPassword('')
            setPassword('')
            setPasswordConfirmation('')
          }}>
          Cancel
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
