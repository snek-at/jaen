import {Button, Tooltip} from '@chakra-ui/react'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const VersionButton: React.FC = props => {
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
        onClick={() =>
          window.open('https://github.com/snek-at/jaen/releases', 'blank')
        }>
        v2.0.0
      </Button>
    </Tooltip>
  )
}

export default VersionButton
