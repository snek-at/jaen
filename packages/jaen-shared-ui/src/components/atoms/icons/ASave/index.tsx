import {IconProps, useColorMode} from '@chakra-ui/react'
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

export const ASaveLottie: LottieFnFn = (dm: boolean) => container => {
  let creator: LottieFnResult['creator']
  const containerProps: LottieFnResult['containerProps'] = {
    style: {width: 24}
  }

  creator = createLottie({
    container,
    animationData: require(dm
      ? `./1312-micro-sd-card-outline-dm.json`
      : `./1312-micro-sd-card-outline.json`),
    loop: false
  })

  return {creator, containerProps}
}

type ASaveIconProps = IconProps

const ASaveIcon: React.FC<ASaveIconProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = ASaveLottie(colorMode === 'dark')

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

export default ASaveIcon
