import {MediaNode, useMediaModal} from 'jaen'

import {FormMediaChooser} from '../components/shared/FormMediaChooser'

export interface FormMediaChooserProps {
  onChoose: (media: MediaNode) => void
  onRemove: () => void
  description?: string
  value?: string
}

const FormMediaChooserContainer: React.FC<FormMediaChooserProps> = props => {
  const context = useMediaModal({
    onSelect: media => {
      props.onChoose(media)
    }
  })

  return (
    <FormMediaChooser
      onChoose={context.toggleModal}
      onRemove={props.onRemove}
      description={props.description}
      value={props.value}
    />
  )
}

export default FormMediaChooserContainer
