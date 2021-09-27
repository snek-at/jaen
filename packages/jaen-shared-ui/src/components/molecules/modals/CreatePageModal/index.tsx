import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'

export type CreatePageModalProps = {
  isOpen: boolean
  templates: string[]
  onClose: () => void
  onCreate: (name: string, template: string) => void
  onValidate: (name: string) => boolean
}

export const CreatePageModal: React.FC<CreatePageModalProps> = props => {
  const [template, setTemplate] = React.useState<string | null>(null)
  const [name, setName] = React.useState<string>('')

  const validate = () => {
    return props.onValidate(name) && template !== null
  }

  const handleCreate = () => {
    if (name && template) {
      props.onCreate(name, template)
    }

    handleClose()
  }

  const handleClose = () => {
    setName('')
    props.onClose()
  }

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Page</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Select
              variant="filled"
              placeholder="Select template"
              onChange={e => setTemplate(e.target.value || null)}>
              {props.templates.map((template, key) => (
                <option key={key} value={template}>
                  {template}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Page title"
              value={name}
              onChange={e => setName(e.target.value)}
              isInvalid={!validate()}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button disabled={!validate()} onClick={handleCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreatePageModal
