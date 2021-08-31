import {Divider, HStack, Stack, Flex, Spacer} from '@chakra-ui/react'

export type HotbarMainProps = {
  start: JSX.Element[]
  end: JSX.Element[]
}

const HotbarMain: React.FC<HotbarMainProps> = ({start, end}) => {
  return (
    <>
      <HStack>
        <Flex width="100%">
          <Stack direction="row">
            <Divider borderLeftWidth="2px" orientation="vertical" />
            {start.map((item, index) => (
              <div key={index}> {item} </div>
            ))}
          </Stack>
          <Spacer />
          <Stack direction="row">
            {end.map((item, index) => (
              <div key={index}> {item} </div>
            ))}
            <Divider borderLeftWidth="2px" orientation="vertical" />
          </Stack>
        </Flex>
      </HStack>
    </>
  )
}

export default HotbarMain
