import {IconProps, useColorMode} from '@chakra-ui/react'
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

export const ADiscardLottie: LottieFnFn = (dm: boolean) => container => {
  let creator: LottieFnResult['creator']
  const containerProps: LottieFnResult['containerProps'] = {
    style: {width: 24}
  }

  creator = createLottie({
    container,
    animationData: require(dm
      ? `./185-trash-bin-outline-dm.json`
      : `./185-trash-bin-outline.json`),
    loop: false
  })

  return {creator, containerProps}
}

type ADiscardIconProps = IconProps

const ADiscardIcon: React.FC<ADiscardIconProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = ADiscardLottie(colorMode === 'dark')

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

export default ADiscardIcon
