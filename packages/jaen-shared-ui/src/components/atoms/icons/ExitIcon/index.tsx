import {Icon, IconProps} from '@chakra-ui/react'
import {FaSignOutAlt} from '@react-icons/all-files/fa/FaSignOutAlt'

type ExitIconProps = IconProps

const ExitIcon: React.FC<ExitIconProps> = props => {
  return <FaSignOutAlt />
}

export default ExitIcon
