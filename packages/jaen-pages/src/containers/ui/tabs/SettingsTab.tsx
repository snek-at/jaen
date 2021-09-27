import {useDisclosure} from '@chakra-ui/hooks'
import {useSiteMetadata} from '@contexts/cms'
import loadable from '@loadable/component'
import {Settings} from '@snek-at/jaen-shared-ui'
import * as actions from '@store/actions/siteActions'
import {useAppDispatch} from '@store/index'
import {withRedux} from '@store/withRedux'
import * as React from 'react'

const SnekFinder = loadable(() => import('@containers/SnekFinder'))

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
            handleValuesChange({...siteMetadata, image: i.src})

            fileSelector.onClose()
          }}
        />
      )}
    </>
  )
}

export default withRedux(SettingsTab)
