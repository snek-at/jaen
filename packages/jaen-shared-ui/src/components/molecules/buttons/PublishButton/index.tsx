import {Button, Badge, useColorMode, Tooltip} from '@chakra-ui/react'
import {APublishLottie} from '@components/atoms/icons/APublishIcon'
import {Lottie} from '@snek-at/react-lottie'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

export type PublishButtonProps = {
  disabled?: boolean
  onPublishClick: () => void
}

const PublishButton: React.FC<PublishButtonProps> = ({
  disabled,
  onPublishClick,
  ...rest
}) => {
  const {colorMode} = useColorMode()

  const lottie = APublishLottie(colorMode === 'dark')

  const CONTENT = useLanguageModeValue(translations)

  return (
    <Lottie lottie={lottie} forceReloadDeps={[lottie]}>
      {({container, animation}) => (
        <Tooltip
          hasArrow
          label={CONTENT.tooltip}
          placement="bottom-start"
          fontSize="md">
          <Button
            disabled={disabled}
            size="sm"
            variant="outline"
            leftIcon={container}
            onClick={() => {
              animation.playSegments([0, animation.totalFrames], true)
              onPublishClick()
            }}
            {...(rest as any)}>
            {CONTENT.button}
          </Button>
        </Tooltip>
      )}
    </Lottie>
  )
}

export default PublishButton
