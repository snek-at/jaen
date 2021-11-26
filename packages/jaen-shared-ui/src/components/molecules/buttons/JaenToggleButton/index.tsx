import {Tooltip, IconButton, Text} from '@chakra-ui/react'
import {SnekIcon} from '@components/atoms/icons'
import {useLanguageModeValue} from '@src/language-mode'
import React from 'react'

import translations from './translations.json'

export type JaenToggleButtonProps = {
  onClick: () => void
}

const JaenToggleButton = React.forwardRef<
  HTMLButtonElement,
  JaenToggleButtonProps
>((props, ref) => {
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
        ref={ref}
      />
    </Tooltip>
  )
})

export default JaenToggleButton
