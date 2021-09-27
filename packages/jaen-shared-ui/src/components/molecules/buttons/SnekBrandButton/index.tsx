import {Button, Text, Tooltip} from '@chakra-ui/react'
import {SnekIcon} from '@components/atoms/icons'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const SnekBrandButton: React.FC = props => {
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
