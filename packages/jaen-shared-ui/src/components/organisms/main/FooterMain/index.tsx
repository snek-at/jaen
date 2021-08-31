import {
  HStack,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'

import {CopyrightButton, LanguageButton, VersionButton, TooltipButton} from '../../../molecules/buttons'

const MainFooter:React.FC = () => {

  return (
    <>
      <HStack width="100%">
        <CopyrightButton />
        <Spacer />
        <TooltipButton />
        <LanguageButton />
        <VersionButton />
      </HStack>
    </>
  )
}

export default MainFooter