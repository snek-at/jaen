import {Badge, Button, Menu, MenuButton, MenuItem, MenuList, MenuDivider, Tooltip} from '@chakra-ui/react'

import translations from './translations.json'

const LanguageButton: React.FC = props => {

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
      <Menu isLazy>
        <MenuButton
          size="sm"
          as={Button}
          aria-label="Options"
          rightIcon={
            <Badge borderRadius="full" px="2" colorScheme="green">
              en
            </Badge>
          }
          variant="ghost">
          Language
        </MenuButton>
        <MenuList>
          <MenuItem command="⌘T">en</MenuItem>
          <MenuDivider />
          <MenuItem command="⌘T">de</MenuItem>
        </MenuList>
      </Menu>
    </Tooltip>
  )
}

export default LanguageButton
