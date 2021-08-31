import {Button, Badge, Tooltip} from '@chakra-ui/react'

import translations from './translations.json'

const TooltipButton: React.FC = props => {
  const LM = 'en'
  const TM = true

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
      label={TM ? CONTENT.tooltip_on : CONTENT.tooltip_off}
      placement="bottom-start"
      fontSize="md">
      <Button
        size="sm"
        aria-label="Options"
        rightIcon={
          <Badge borderRadius="full" px="2" colorScheme="green">
            {TM ? CONTENT.active : CONTENT.inactive}
          </Badge>
        }
        variant="ghost">
        {CONTENT.button}
      </Button>
    </Tooltip>
  )
}

export default TooltipButton
