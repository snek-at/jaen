import {Input, InputGroup, InputLeftElement, HStack} from '@chakra-ui/react'

import {SearchIcon} from '../../../atoms/icons'
import {
  SnekButton,
  DmToggleButton,
  QuestionButton,
  GithubButton
} from '../../../molecules/buttons'

const MainHeader: React.FC = () => {
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

export default MainHeader
