import {SunIcon, MoonIcon} from '@chakra-ui/icons'

export type DmToggleProps = {
  isDMEnabled: boolean
}

const DmToggle: React.FC<DmToggleProps> = ({isDMEnabled}) =>
  isDMEnabled ? <SunIcon /> : <MoonIcon />

export default DmToggle
