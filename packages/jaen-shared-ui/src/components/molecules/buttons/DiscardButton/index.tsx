import {Button, Badge, useColorMode, Tooltip} from '@chakra-ui/react'
import {Lottie} from '@snek-at/react-lottie'

import {ADiscardLottie} from '../../../atoms/icons/ADiscardIcon'
import translations from './translations.json'

export type DiscardButtonProps = {
  onDiscardClick: () => void
}

const DiscardButton: React.FC<DiscardButtonProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = ADiscardLottie(colorMode === 'dark')

  const LM = 'en'

  type Translations = {[name: string]: {en: string; de: string}}

  type Trs<T> = {[name in keyof T]: string}

  function useLanguageModeValue<T extends Translations>(value: T) {
    const translation: Trs<T> = {} as Trs<T>

    for (const [key, element] of Object.entries(value)) {
      translation[key as keyof T] = element[LM]
    }

    return translation
  }

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
            size="sm"
            variant="outline"
            leftIcon={container}
            // rightIcon={
            //   <Badge borderRadius="full" px="2" colorScheme="yellow">
            //     143
            //   </Badge>
            // }
            onClick={() => {
              animation.playSegments([0, animation.totalFrames], true)
              props.onDiscardClick()
            }}
            {...(props as any)}>
            {CONTENT.button}
          </Button>
        </Tooltip>
      )}
    </Lottie>
  )
}

export default DiscardButton
