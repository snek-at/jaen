import {
  As,
  Button,
  CreateToastFnReturn,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'

enum ModalType {
  Alert,
  Confirm,
  Prompt
}

interface OpenerFn {
  (
    args: {
      icon?: As
      title: string
      message: string
      confirmText?: string
      cancelText?: string
      placeholder?: string
    },
    defaultValue?: string
  ): Promise<any>
}

export interface Notifications {
  alert: OpenerFn
  confirm: OpenerFn
  prompt: OpenerFn
  toast: CreateToastFnReturn
}

const defaultContext: Notifications = {
  alert() {
    throw new Error('<NotificationsProvider> is missing')
  },
  confirm() {
    throw new Error('<NotificationsProvider> is missing')
  },
  prompt() {
    throw new Error('<NotificationsProvider> is missing')
  },
  toast: {} as CreateToastFnReturn
}

const Context = createContext<Notifications>(defaultContext)

interface AnyEvent {
  preventDefault: () => void
}

export const NotificationsProvider = ({children}: {children: ReactNode}) => {
  const toast = useToast({
    position: 'bottom',
    duration: 2000,
    isClosable: true,
    variant: 'subtle'
  })

  const [modal, setModal] = useState<ReactNode | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const ok = useRef<HTMLButtonElement>(null)

  // const jaenTheme = useJaenTheme()

  const createOpener = useCallback(
    (type: ModalType) =>
      async (...props: Parameters<OpenerFn>) =>
        await new Promise(resolve => {
          const [args, defaultValue] = props

          const handleClose = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            resolve(null)
          }

          const handleCancel = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            if (type === ModalType.Prompt) resolve(null)
            else resolve(false)
          }

          const handleOK = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            if (type === ModalType.Prompt) resolve(input.current?.value)
            else resolve(true)
          }

          const Content = () => {
            const [inputValue, setInputValue] = useState(defaultValue || '')

            return (
              <>
                <ModalHeader>
                  <Stack direction="row" alignItems="center">
                    {args.icon && (
                      <Icon
                        as={args.icon}
                        bg="brand.100"
                        color="brand.500"
                        borderRadius="full"
                        boxSize="10"
                        p="2"
                      />
                    )}
                    <Text>{args.title}</Text>
                  </Stack>
                </ModalHeader>
                <ModalBody mt="0" mb={2}>
                  <Stack spacing={5}>
                    <Text>{args.message}</Text>
                    {type === ModalType.Prompt && (
                      <Input
                        ref={input}
                        placeholder={args.placeholder}
                        defaultValue={defaultValue}
                        onChange={e => setInputValue(e.target.value)}
                        value={inputValue}
                      />
                    )}
                  </Stack>
                </ModalBody>
                <ModalFooter bg="bg.subtle" py="3">
                  {type !== ModalType.Alert && (
                    <Button mr={3} variant="outline" onClick={handleCancel}>
                      {args.cancelText || 'Cancel'}
                    </Button>
                  )}
                  <Button
                    onClick={handleOK}
                    ref={ok}
                    isDisabled={type === ModalType.Prompt && inputValue === ''}>
                    {args.confirmText || 'OK'}
                  </Button>
                </ModalFooter>
              </>
            )
          }

          setModal(
            <Modal
              isOpen={true}
              onClose={handleClose}
              initialFocusRef={type === ModalType.Prompt ? input : ok}>
              <ModalOverlay />
              <ModalContent
                containerProps={{
                  id: 'coco'
                }}
                overflow="hidden">
                <Content />
              </ModalContent>
            </Modal>
          )
        }),
    [children]
  )

  return (
    <Context.Provider
      value={{
        alert: createOpener(ModalType.Alert),
        confirm: createOpener(ModalType.Confirm),
        prompt: createOpener(ModalType.Prompt),
        toast
      }}>
      {modal}

      {children}
    </Context.Provider>
  )
}

export const useNotificationsContext = () => useContext(Context)
