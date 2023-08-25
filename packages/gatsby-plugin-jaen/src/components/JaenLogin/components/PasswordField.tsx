import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs
} from '@chakra-ui/react'
import {forwardRef, useRef} from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  ({isInvalid, isRequired, ...props}, ref) => {
    const {isOpen, onToggle} = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({preventScroll: true})
      }
    }

    return (
      <FormControl
        id="login_form_password"
        isInvalid={isInvalid}
        isRequired={isRequired}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            {...props}
          />
          <InputRightElement>
            <IconButton
              variant="text"
              color="brand.500"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <FaEyeSlash /> : <FaEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {props.name === 'password' && 'Password is required'}
        </FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
