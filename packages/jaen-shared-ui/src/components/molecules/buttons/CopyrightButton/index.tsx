import {Button, Tooltip} from '@chakra-ui/react'

import translations from './translations.json'

const CopyrightButton: React.FC = props => {
  
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
      <Button 
        size="sm"
        variant="ghost" 
        onClick={() => window.open('https://github.com/snek-at/jaen/blob/main/LICENSES/preferred/EUPL-1.2', 'blank')}>
        2021 &copy; snek-at
      </Button>
    </Tooltip>
  )
}

export default CopyrightButton
