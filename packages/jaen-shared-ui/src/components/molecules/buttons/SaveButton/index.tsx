import {Button, Tooltip, useColorMode} from '@chakra-ui/react'
import {ASaveLottie} from '@components/atoms/icons/ASave'
import {Lottie} from '@snek-at/react-lottie'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const SaveButton: React.FC = props => {
  const {colorMode} = useColorMode()

  const lottie = ASaveLottie(colorMode === 'dark')

  const CONTENT = useLanguageModeValue(translations)

  return (
    <Lottie lottie={lottie} forceReloadDeps={[lottie]}>
      {({animation, container}) => (
        <Tooltip
          hasArrow
          label={CONTENT.tooltip}
          placement="bottom-start"
          fontSize="md">
          <Button
            size="sm"
            variant="outline"
            leftIcon={container}
            onClick={() => {
              animation.playSegments([0, animation.totalFrames], true)
            }}
            {...(props as any)}>
            {CONTENT.button}
          </Button>
        </Tooltip>
      )}
    </Lottie>
  )
}

export default SaveButton
