import {Button, Text, Tooltip} from '@chakra-ui/react'

import {SnekIcon} from '../../../atoms/icons'
import translations from './translations.json'

const SnekBrandButton: React.FC = props => {
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
    <Button
      minW="4xs"
      variant="ghost"
      leftIcon={<SnekIcon w={35} h={35} />}
      onClick={() => window.open('https://snek.at', 'blank')}>
      <Text>snek - Jaen</Text>
    </Button>
  )
}

export default SnekBrandButton
