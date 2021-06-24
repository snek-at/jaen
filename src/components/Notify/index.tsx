import {notification} from 'antd'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {store} from '~/types'

const openNotificationWith = (
  type: 'success' | 'info' | 'warning' | 'error',
  context: {message: string; description: string}
) => {
  notification[type]({
    ...context
  })
}

const Notify: React.FC = () => {
  const notifications = useSelector((state: store.RootState) => state.notify)

  useEffect(() => {
    const error = notifications.error

    if (error) {
      openNotificationWith('error', error)
    }
  }, [notifications.error])

  return null
}

export default Notify
