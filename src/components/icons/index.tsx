import Icon from '@ant-design/icons'

import {ReactComponent as SnekSvg} from '~/common/snek-logo.svg'

type IconProps = {
  style?: React.CSSProperties
}

export const SnekIcon: React.FC<IconProps> = props => (
  <Icon component={SnekSvg} style={{fontSize: '200%'}} {...props} />
)
