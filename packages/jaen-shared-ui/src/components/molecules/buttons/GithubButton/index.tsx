import {IconButton, Tooltip} from '@chakra-ui/react'
import {GithubIcon} from '@components/atoms/icons'
import {useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const GithubButton: React.FC = props => {
  const CONTENT = useLanguageModeValue(translations)

  return (
    <Tooltip
      hasArrow
      label={CONTENT.tooltip}
      placement="bottom-start"
      fontSize="md">
      <IconButton variant="ghost" aria-label="adad" icon={<GithubIcon />} />
    </Tooltip>
  )
}

export default GithubButton
