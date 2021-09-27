import {IconProps, useColorMode} from '@chakra-ui/react'
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

export const AEditLottie: LottieFnFn = (dm: boolean) => container => {
  let creator: LottieFnResult['creator']
  const containerProps: LottieFnResult['containerProps'] = {
    style: {width: 24}
  }

  creator = createLottie({
    container,
    animationData: require(dm
      ? `./35-edit-outline-dm.json`
      : `./35-edit-outline.json`),
    loop: false
  })

  return {creator, containerProps}
}

type SnekIconProps = IconProps

const AEdit: React.FC<SnekIconProps> = props => {
  const {colorMode} = useColorMode()

  const lottie = AEditLottie(colorMode === 'dark')

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

export default AEdit
