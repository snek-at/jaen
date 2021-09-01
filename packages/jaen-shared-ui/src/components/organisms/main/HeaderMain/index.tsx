import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Divider
} from '@chakra-ui/react'

import {SearchIcon} from '../../../atoms/icons'
import {
  SnekButton,
  DmToggleButton,
  QuestionButton,
  GithubButton
} from '../../../molecules/buttons'
import ExitButton from '../../../molecules/buttons/ExitButton'

export type HeaderMainProps = {
  onLogout: () => void
}

const HeaderMain: React.FC<HeaderMainProps> = props => {
  return (
    <>
      <HStack>
        <SnekButton />
        <InputGroup maxW={'5xl'}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="tel" placeholder="Search" />
        </InputGroup>
        <GithubButton />
        <QuestionButton />
        <DmToggleButton onDmToggleChange={() => null} />
        <Divider orientation="vertical" />
        <ExitButton onClick={props.onLogout} />
      </HStack>
    </>
  )
}

export default HeaderMain
