import {Tooltip, IconButton, useColorMode} from '@chakra-ui/react'
// import {DmToggle} from '@components/atoms/icons'
import {ADmToggleLottie} from '@components/atoms/icons/ADmToggle'
import {Lottie} from '@snek-at/react-lottie'
import {useState} from 'react'

import translations from './translations.json'

export type DmToggleButtonProps = {
  onDmToggleChange: (editing: boolean) => void
}

const ADmToggleButton: React.FC<DmToggleButtonProps> = props => {
  const [active, setActive] = useState(false)
  const toggleActive = () => {
    setActive(!active)
    props.onDmToggleChange(!active)
  }

  const {colorMode, toggleColorMode} = useColorMode()
  const dm: boolean = colorMode === 'dark'

  const lottie = ADmToggleLottie(colorMode === 'dark')

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
      {({animation, container}) => (
        <Tooltip
          hasArrow
          label={active ? CONTENT.tooltip_on : CONTENT.tooltip_off}
          placement="bottom-start"
          fontSize="md">
          <i
            onClick={() => {
              colorMode === 'dark'
                ? animation.playSegments([0, 114], true)
                : animation.playSegments([114, 228], true)

              toggleColorMode()
              toggleActive()
            }}
            {...(props as any)}>
            <IconButton
              aria-label="darkmode toggle"
              variant="ghost"
              icon={container}
            />
          </i>
        </Tooltip>
      )}
    </Lottie>
    // <Tooltip
    //   hasArrow
    //   label={dm ? CONTENT.tooltip_on : CONTENT.tooltip_off}
    //   placement="bottom-start"
    //   fontSize="md">
    //   <IconButton
    //     aria-label="darkmode toggle"
    //     variant="ghost"
    //     icon={<DmToggle isDMEnabled={dm} />}
    //     onClick={() => {
    //       toggleColorMode()
    //     }}
    //     {...(props as any)}
    //   />
    // </Tooltip>
  )
}

export default ADmToggleButton
