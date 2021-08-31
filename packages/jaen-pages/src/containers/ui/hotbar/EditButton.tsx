import {EditButton} from '@snek-at/jaen-shared-ui/dist/components/molecules/buttons'
import React from 'react'

import {useAppDispatch, useAppSelector} from '../../../store'
import * as actions from '../../../store/actions/optionsActions'
import {withRedux} from '../../../store/withRedux'

const Button: React.FC = () => {
  const dispatch = useAppDispatch()

  const isEditing = useAppSelector(state => state.options.isEditing)

  const handleEditChange = (edtiting: boolean) => {
    dispatch(actions.setEditing(edtiting))
  }

  return <EditButton isEditing={isEditing} onEditChange={handleEditChange} />
}

export default withRedux(Button)
