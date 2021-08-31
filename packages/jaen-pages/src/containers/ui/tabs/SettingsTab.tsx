import {useDisclosure} from '@chakra-ui/hooks'
import {Settings} from '@snek-at/jaen-shared-ui'
import * as React from 'react'

import {useSiteMetadata} from '../../../contexts/cms'
import {useAppDispatch} from '../../../store'
import * as actions from '../../../store/actions/siteActions'
import {withRedux} from '../../../store/withRedux'
import SnekFinder from '../../SnekFinder'

const SettingsTab: React.FC<{}> = () => {
  const dispatch = useAppDispatch()

  const fileSelector = useDisclosure()

  const siteMetadata = useSiteMetadata()

  const handleValuesChange = (values: any) => {
    dispatch(actions.updateSiteMeta({meta: values}))
  }

  const handleImageClick = () => {
    fileSelector.onOpen()
  }

  return (
    <>
      <Settings
        values={siteMetadata as any}
        onValuesChange={handleValuesChange}
        onImageClick={handleImageClick}
      />
      {fileSelector.isOpen && (
        <SnekFinder
          mode="selector"
          onSelectorClose={fileSelector.onClose}
          onSelectorSelect={i => {
            handleValuesChange({image: i.src})

            fileSelector.onClose()
          }}
        />
      )}
    </>
  )
}

export default withRedux(SettingsTab)
