import {Button, Badge, Tooltip} from '@chakra-ui/react'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const TooltipButton: React.FC = props => {
  const TM = true

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
