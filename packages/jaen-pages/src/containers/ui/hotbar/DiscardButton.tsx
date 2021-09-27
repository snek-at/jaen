import {DiscardButton} from '@snek-at/jaen-shared-ui/dist/components/molecules/buttons'
import * as actions from '@store/actions/siteActions'
import {useAppDispatch, useAppSelector} from '@store/index'
import {withRedux} from '@store/withRedux'
import React from 'react'

const Button: React.FC = () => {
  const dispatch = useAppDispatch()

  // const site = useAppSelector(state => state.site)

  const handleDiscard = () => {
    dispatch(actions.discardSiteChanges())
  }

  return <DiscardButton onDiscardClick={handleDiscard} />
}

export default withRedux(Button)
