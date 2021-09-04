import {IconButton} from '@chakra-ui/react'
import {ExitIcon} from '@components/atoms/icons'

export type ExitButtonProps = {
  onClick: () => void
}

const ExitButton: React.FC<ExitButtonProps> = props => {
  return (
    <IconButton
      variant="ghost"
      aria-label="adad"
      colorScheme="red"
      icon={<ExitIcon />}
      onClick={props.onClick}
    />
  )
}

export default ExitButton
