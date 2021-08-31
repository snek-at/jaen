import {Tooltip, IconButton, Text} from '@chakra-ui/react'

import {SnekIcon} from '../../../atoms/icons'
import translations from './translations.json'


export type JaenToggleButtonProps = {
  ref: React.Ref<HTMLButtonElement>
  onClick: () => void
}

const JaenToggleButton: React.FC<JaenToggleButtonProps> = props => {

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
    <Tooltip
    hasArrow
    label={CONTENT.tooltip}
    placement="bottom-start"
    fontSize="md">
      <IconButton
        aria-label="Toggle snek jaen"
        w={[50, 60, 70]}
        h={[50, 60, 70]}
        icon={<SnekIcon h={[30, 40, 50]} />}
        onClick={props.onClick}
        ref={props.ref}
      />
    </Tooltip>
  )
}

export default JaenToggleButton
