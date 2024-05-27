import React, {useEffect} from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import {Button} from './ui/button'
import {useNotificationPopupWidget} from '../hooks/use-notification-popup-widget'

export const Popup: React.FC<{}> = () => {
  const [{data}] = useNotificationPopupWidget()

  const [consent, setConsent] = React.useState(true)

  useEffect(() => {
    // The local storage contains the notification popup data so we can check if the user has already seen the notification
    // When the data is missing or the data is outdated we show the notification
    const localStorageData = localStorage.getItem('notification-popup')

    if (!localStorageData) {
      setConsent(false)
    }

    // String comparison to check if the data is outdated
    else if (data && localStorageData !== JSON.stringify(data)) {
      setConsent(false)
    } else {
      setConsent(true)
    }
  }, [data])

  const handleConsent = () => {
    localStorage.setItem('notification-popup', JSON.stringify(data))
    setConsent(true)
  }

  useEffect(() => {
    // Skip if the user has already seen the notification
    if (consent) {
      return
    }

    const popup = document.getElementById('notification-popup')
    if (popup) {
      // Check if the notification is enabled
      const isEnabled = data?.isEnabled ?? false
      const from = data?.from ? new Date(data?.from) : null
      const to = data?.to ? new Date(data?.to) : null

      if (isEnabled) {
        const now = new Date()

        let isInTimeRange = true
        if (from && to) {
          isInTimeRange = now >= from && now <= to
        } else if (from) {
          isInTimeRange = now >= from
        } else if (to) {
          isInTimeRange = now <= to
        }

        if (isInTimeRange) {
          popup.click()
        }
      }
    }
  }, [consent, data])

  return (
    <Dialog>
      <DialogTrigger id="notification-popup" className="hidden" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{data?.title}</DialogTitle>
        </DialogHeader>
        <p
          className="prose"
          dangerouslySetInnerHTML={{__html: data?.message || ''}}></p>

        <DialogFooter>
          <DialogClose>
            <Button onClick={handleConsent}>Gelesen / Read</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
