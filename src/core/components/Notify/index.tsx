/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {notification} from 'antd'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '~/store'

const openNotificationWith = (
  type: 'success' | 'info' | 'warning' | 'error',
  context: {message: string; description: string}
): void => {
  notification[type]({
    ...context
  })
}

const Notify: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notify)

  useEffect(() => {
    const error = notifications.error

    if (error) {
      openNotificationWith('error', error)
    }
  }, [notifications.error])

  return null
}

export default Notify
