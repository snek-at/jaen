import {useJaenCoreContext} from '@snek-at/jaen'
import {PublishButton} from '@snek-at/jaen-shared-ui/dist/components/molecules/buttons'
import React from 'react'

import {withRedux} from '../../../store/withRedux'

const Button: React.FC = () => {
  const core = useJaenCoreContext()

  return (
    <PublishButton
      onPublishClick={() => {
        core.onPublish().then(res => console.log('PUBLISH', res))
      }}
    />
  )
}

export default withRedux(Button)
