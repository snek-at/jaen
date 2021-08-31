import {Icon, IconProps, useColorMode} from '@chakra-ui/react'
import {faFile as farFile} from '@fortawesome/free-regular-svg-icons/faFile'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

type FileIconProps = IconProps

const FileIcon: React.FC<FileIconProps> = props => {
  return <FontAwesomeIcon icon={farFile} />
}

export default FileIcon
