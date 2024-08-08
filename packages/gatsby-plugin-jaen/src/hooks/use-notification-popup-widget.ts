import {useWidget} from '@atsnek/jaen'

export const useNotificationPopupWidget = () => {
  return useWidget<{
    id: string
    isEnabled: boolean
    title: string
    message: string
    from: string
    to: string
  }>('notification:popup')
}
