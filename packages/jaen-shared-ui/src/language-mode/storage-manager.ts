import {__DEV__} from '@chakra-ui/utils'

import type {LanguageMode} from './types'

const hasSupport = () => typeof Storage !== 'undefined'
export const storageKey = 'snek-at-language-mode'

type MaybeLanguageMode = LanguageMode | undefined

export interface StorageManager {
  get(init?: LanguageMode): MaybeLanguageMode
  set(value: LanguageMode): void
  type: 'cookie' | 'localStorage'
}

/**
 * Simple object to handle read-write to localStorage
 */
export const localStorageManager: StorageManager = {
  get(init?) {
    if (!hasSupport()) return init
    try {
      const value = localStorage.getItem(storageKey) as MaybeLanguageMode
      return value ?? init
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      return init
    }
  },
  set(value) {
    if (!hasSupport()) return
    try {
      localStorage.setItem(storageKey, value)
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
    }
  },
  type: 'localStorage'
}

/**
 * Simple object to handle read-write to cookies
 */
export const cookieStorageManager = (cookies = ''): StorageManager => ({
  get(init?) {
    const match = cookies.match(new RegExp(`(^| )${storageKey}=([^;]+)`))

    if (match) {
      return match[2] as LanguageMode
    }

    return init
  },
  set(value) {
    document.cookie = `${storageKey}=${value}; max-age=31536000; path=/`
  },
  type: 'cookie'
})
