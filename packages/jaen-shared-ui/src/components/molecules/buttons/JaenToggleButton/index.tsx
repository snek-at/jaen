import {Tooltip, IconButton, Text} from '@chakra-ui/react'
import {SnekIcon} from '@components/atoms/icons'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

export type JaenToggleButtonProps = {
  ref: React.Ref<HTMLButtonElement>
  onClick: () => void
}

const JaenToggleButton: React.FC<JaenToggleButtonProps> = props => {
  const CONTENT = useLanguageModeValue(translations)

  return (
    <Tooltip
      hasArrow
      label={CONTENT.tooltip}
      placement="bottom-start"
      fontSize="md">
      <IconButton
        aria-label="Toggle snek jaen"
        boxSize="20"
        icon={<SnekIcon boxSize="14" />}
        onClick={props.onClick}
        ref={props.ref}
      />
    </Tooltip>
  )
}

export default JaenToggleButton
