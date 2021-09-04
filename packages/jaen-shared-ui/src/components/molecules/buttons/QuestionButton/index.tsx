import {IconButton, Tooltip} from '@chakra-ui/react'
import {QuestionIcon} from '@components/atoms/icons'

import translations from './translations.json'

const QuestionButton: React.FC = props => {
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
      <IconButton variant="ghost" aria-label="adad" icon={<QuestionIcon />} />
    </Tooltip>
  )
}

export default QuestionButton
