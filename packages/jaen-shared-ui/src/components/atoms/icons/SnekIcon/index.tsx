import {ReactComponent as SnekDarkMode} from '@assets/snek-logo-dm.svg'
import {ReactComponent as Snek} from '@assets/snek-logo.svg'
import {Icon, IconProps, useColorMode} from '@chakra-ui/react'

type SnekIconProps = IconProps

const SnekIcon: React.FC<SnekIconProps> = props => {
  const {colorMode} = useColorMode()

  return (
    <Icon
      as={colorMode === 'dark' ? SnekDarkMode : Snek}
      w={75}
      h={75}
      {...(props as any)}
    />
  )
}

export default SnekIcon
