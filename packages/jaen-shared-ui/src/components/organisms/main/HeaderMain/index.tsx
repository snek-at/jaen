import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Divider
} from '@chakra-ui/react'
import {SearchIcon} from '@components/atoms/icons'
import {
  SnekButton,
  DmToggleButton,
  QuestionButton,
  GithubButton
} from '@components/molecules/buttons'

export type HeaderMainProps = {}

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
      </HStack>
    </>
  )
}

export default HeaderMain
