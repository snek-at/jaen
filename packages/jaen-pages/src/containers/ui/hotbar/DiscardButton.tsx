import {DiscardButton} from '@snek-at/jaen-shared-ui/dist/components/molecules/buttons'
import React from 'react'

import {useAppDispatch, useAppSelector} from '../../../store'
import * as actions from '../../../store/actions/siteActions'
import {withRedux} from '../../../store/withRedux'

const Button: React.FC = () => {
  const dispatch = useAppDispatch()

  // const site = useAppSelector(state => state.site)

  const handleDiscard = () => {
    dispatch(actions.discardSiteChanges())
  }

  return <DiscardButton onDiscardClick={handleDiscard} />
}

export default withRedux(Button)
