/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {
  Space,
  Row,
  Divider,
  Button,
  Typography,
  notification,
  Collapse
} from 'antd'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '~/store'

import {htmlObjectDiff} from '~/common/diff'

import CleanModal from '~/components/modals/Clean'

import {publish} from '~/store/actions/cms'
import {combinedDLSelector, workingDLSelector} from '~/store/selectors/cms'

const PublishModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const cleanedWorking = useSelector(workingDLSelector)
  const cleandedCombinedWorking = useSelector(combinedDLSelector)

  const [layerDiff, setLayerDiff] = useState<string | null>(null)

  const onChangeCollapse = (): void => {
    setLayerDiff(htmlObjectDiff(cleanedWorking, cleandedCombinedWorking))
  }

  const onPublish = (): void => {
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

      <Divider />

      <Collapse defaultActiveKey={[]} ghost onChange={onChangeCollapse}>
        <Collapse.Panel header="show more" key="1">
          {layerDiff && <div dangerouslySetInnerHTML={{__html: layerDiff}} />}
        </Collapse.Panel>
      </Collapse>
    </CleanModal>
  )
}

export default PublishModal
