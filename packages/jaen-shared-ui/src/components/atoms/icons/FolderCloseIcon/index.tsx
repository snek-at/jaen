import {IconProps} from '@chakra-ui/react'
import {faFolder as farFolderClose} from '@fortawesome/free-regular-svg-icons/faFolder'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

type FolderCloseIconProps = IconProps

const FolderCloseIcon: React.FC<FolderCloseIconProps> = props => {
  return <FontAwesomeIcon icon={farFolderClose} />
}

export default FolderCloseIcon
