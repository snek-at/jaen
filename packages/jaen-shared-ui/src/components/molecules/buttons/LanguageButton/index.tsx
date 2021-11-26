import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Tooltip
} from '@chakra-ui/react'
import {useLanguageMode, useLanguageModeValue} from '@src/language-mode'

import translations from './translations.json'

const LanguageButton: React.FC = props => {
  const {languageMode, setLanguageMode} = useLanguageMode()
  const CONTENT = useLanguageModeValue(translations)

  return (
    <Menu isLazy>
      <Tooltip
        hasArrow
        label={CONTENT.tooltip}
        placement="bottom-start"
        fontSize="md">
        <MenuButton
          size="sm"
          as={Button}
          aria-label="Options"
          rightIcon={
            <Badge borderRadius="full" px="2" colorScheme="green">
              {languageMode}
            </Badge>
          }
          variant="ghost">
          {CONTENT.button}
        </MenuButton>
      </Tooltip>
      <MenuList></MenuList>
    </Menu>
  )
}

export default LanguageButton
