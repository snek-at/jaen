/**
 * @license
 *
 * SPDX-License-Identifier: EUPL-1.2
 * Copyright © 2021 snek.at
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {Space, Row, Divider, Button, Typography, notification} from 'antd'
import ReactDiffViewer from 'react-diff-viewer'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '~/store'

import CleanModal from '~/components/modals/Clean'

import {publish} from '~/store/actions/cms'
import {combinedDLSelector} from '~/store/selectors/cms'

const PublishModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const working = useSelector((state: RootState) => state.cms.dataLayer.working)
  const updatedWorking = useSelector(combinedDLSelector)

  const onPublish = () => {
    dispatch(publish())

    notification.success({
      message: 'The site will be published soon',
      description:
        'The site has been shipped to production. In about 30 seconds the new version is available.'
    })
  }

  return (
    <CleanModal>
      <Space direction={'vertical'}>
        <Row>
          <Typography.Text>
            Welcome to the publish view! By pressing the button below, the fresh
            content will be transferred to production!
          </Typography.Text>
        </Row>
        <Row>
          <Button onClick={onPublish}>Publish</Button>
        </Row>
      </Space>

      <Row gutter={[0, 500]}></Row>
      <Row gutter={[0, 500]}></Row>

      <Divider />
      <ReactDiffViewer
        leftTitle={
          <Typography.Text>
            Content <u>before</u> publish
          </Typography.Text>
        }
        rightTitle={
          <Typography.Text>
            Content <u>after</u> publish
          </Typography.Text>
        }
        oldValue={JSON.stringify(working, null, 2)}
        newValue={JSON.stringify(updatedWorking, null, 2)}
        splitView
      />
    </CleanModal>
  )
}

export default PublishModal
