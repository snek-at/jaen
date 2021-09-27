import {HStack, Spacer} from '@chakra-ui/react'
import {
  CopyrightButton,
  LanguageButton,
  VersionButton,
  TooltipButton
} from '@components/molecules/buttons'
import ExitButton from '@src/components/molecules/buttons/ExitButton'
import React from 'react'

export interface FooterMainProps {
  onLogout: () => void
}

const MainFooter: React.FC<FooterMainProps> = props => {
  return (
    <>
      <HStack width="100%">
        <CopyrightButton />
        <Spacer />
        <TooltipButton />
        <LanguageButton />
        <VersionButton />
        <ExitButton onClick={props.onLogout} />
      </HStack>
    </>
  )
}

export default MainFooter
