import {Icon, IconProps, useColorMode} from '@chakra-ui/react'

import {ReactComponent as SnekDarkMode} from '../../../../common/assets/snek-logo-dm.svg'
import {ReactComponent as Snek} from '../../../../common/assets/snek-logo.svg'

type SnekIconProps = IconProps

const SnekIcon: React.FC<SnekIconProps> = props => {
  const {colorMode} = useColorMode()

  return (
    <Icon
      as={
        colorMode === 'dark'
          ? SnekDarkMode
          : Snek
      }
      w={75}
      h={75}
      {...(props as any)}
    />
  )
}

export default SnekIcon