import {IconProps, useColorMode} from '@chakra-ui/react'
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

export const ADmToggleLottie: LottieFnFn = (dm: boolean) => container => {
  let creator: LottieFnResult['creator']
  const containerProps: LottieFnResult['containerProps'] = {
    style: {width: 24}
  }

  creator = createLottie({
    container,
    animationData: require(`./0-dm-toggle.json`),
    loop: false,
    initialSegment: dm ? [0, 114] : [114, 228]
  })

  creator.animation.setSpeed(2)

  return {creator, containerProps}
}

type ADmToggleIconProps = IconProps

const ADmToggleIcon: React.FC<ADmToggleIconProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = ADmToggleLottie(colorMode === 'dark')

  return (
    <Lottie lottie={lottie}>
      {({animation, container}) => (
        <i
          onClick={() =>
            colorMode === 'dark'
              ? animation.playSegments([0, 114], true)
              : animation.playSegments([114, 228], true)
          }
          {...(props as any)}>
          {container}
        </i>
      )}
    </Lottie>
  )
}

export default ADmToggleIcon
