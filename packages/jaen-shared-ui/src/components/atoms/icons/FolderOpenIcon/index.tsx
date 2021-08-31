import {IconProps} from '@chakra-ui/react'
import {faFolderOpen as farFolderOpen} from '@fortawesome/free-regular-svg-icons/faFolderOpen'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

type FolderOpenIconProps = IconProps

const FolderOpenIcon: React.FC<FolderOpenIconProps> = props => {
  return <FontAwesomeIcon icon={farFolderOpen} />
}

export default FolderOpenIcon
