import {SnekIcon} from '~/components/icons'

import './snekfabbutton.scss'

type SnekFabButtonProps = {
  fabOptions: {text: string; icon: JSX.Element; onClick: () => void}[]
}

const SnekFabButton: React.FC<SnekFabButtonProps> = ({fabOptions}) => {
  return (
    <div className="fab-container">
      <div className="fab fab-icon-holder">
        <i>
          <SnekIcon />
        </i>
      </div>

      <ul className="fab-options">
        {fabOptions.map((e, key) => (
          <li key={key} onClick={e.onClick}>
            <span className="fab-label">{e.text}</span>
            <div className="fab-icon-holder">
              <i>{e.icon}</i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SnekFabButton
