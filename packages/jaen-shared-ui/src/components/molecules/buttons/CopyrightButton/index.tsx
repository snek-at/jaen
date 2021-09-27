import {Button, Tooltip} from '@chakra-ui/react'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const CopyrightButton: React.FC = props => {
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
          window.open(
            'https://github.com/snek-at/jaen/blob/main/LICENSES/preferred/EUPL-1.2',
            'blank'
          )
        }>
        2021 &copy; snek-at
      </Button>
    </Tooltip>
  )
}

export default CopyrightButton
