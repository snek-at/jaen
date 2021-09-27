import {IconProps} from '@chakra-ui/react'
import {FaGithub} from '@react-icons/all-files/fa/FaGithub'

type GithubIconProps = IconProps

const GithubIcon: React.FC<GithubIconProps> = props => {
  return <FaGithub />
}

export default GithubIcon