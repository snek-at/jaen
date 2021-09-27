import {IconProps, useColorMode} from '@chakra-ui/react'
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

export const APublishLottie: LottieFnFn = (dm: boolean) => container => {
  let creator: LottieFnResult['creator']
  const containerProps: LottieFnResult['containerProps'] = {
    style: {width: 24}
  }

  creator = createLottie({
    container,
    animationData: require(dm
      ? `./489-rocket-space-outline-dm.json`
      : `./489-rocket-space-outline.json`),
    loop: false
  })

  return {creator, containerProps}
}

type APublishIconProps = IconProps

const APublishIcon: React.FC<APublishIconProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = APublishLottie(colorMode === 'dark')

  return (
    <Lottie lottie={lottie} forceReloadDeps={[lottie]}>
      {({animation, container}) => (
        <i
          onClick={() =>
            animation.playSegments([0, animation.totalFrames], true)
          }
          {...(props as any)}>
          {container}
        </i>
      )}
    </Lottie>
  )
}

export default APublishIcon
