import {Button, Tooltip, Badge, useColorMode} from '@chakra-ui/react'
import {AEditLottie} from '@components/atoms/icons/AEdit'
import {Lottie} from '@snek-at/react-lottie'
import {useLanguageModeValue} from '@src/language-mode'
import React, {useState} from 'react'

import translations from './translations.json'

export type EditButtonProps = {
  isEditing: boolean
  onEditChange: (editing: boolean) => void
}

const EditButton: React.FC<EditButtonProps> = ({
  isEditing,
  onEditChange,
  ...rest
}) => {
  const [active, setActive] = useState(isEditing)
  const toggleActive = () => {
    setActive(!active)
    onEditChange(!active)
  }

  const {colorMode} = useColorMode()
  const lottie = AEditLottie(colorMode === 'dark')

  const CONTENT = useLanguageModeValue(translations)

  return (
    <Lottie lottie={lottie} forceReloadDeps={[colorMode]}>
      {({container, animation}) => (
        <Tooltip
          hasArrow
          label={active ? CONTENT.tooltip_on : CONTENT.tooltip_off}
          placement="bottom-start"
          fontSize="md">
          <Button
            size="sm"
            variant="outline"
            leftIcon={container}
            rightIcon={
              <Badge
                borderRadius="full"
                px="2"
                colorScheme={active ? 'green' : 'red'}>
                {active ? CONTENT.active : CONTENT.inactive}
              </Badge>
            }
            onClick={() => {
              animation.playSegments([0, animation.totalFrames], true)
              toggleActive()
            }}
            {...(rest as any)}>
            {CONTENT.button}
          </Button>
        </Tooltip>
      )}
    </Lottie>
  )
}

export default EditButton
