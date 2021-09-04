import {HStack, Spacer} from '@chakra-ui/react'
import {
  CopyrightButton,
  LanguageButton,
  VersionButton,
  TooltipButton
} from '@components/molecules/buttons'
import React from 'react'

const MainFooter: React.FC = () => {
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
