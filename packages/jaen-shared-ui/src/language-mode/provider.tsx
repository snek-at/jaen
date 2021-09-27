import {isBrowser, noop, __DEV__} from '@chakra-ui/utils'
import * as React from 'react'

import {localStorageManager, StorageManager} from './storage-manager'
import {LanguageMode, Translations, Trs} from './types'

export type {LanguageMode}

export interface LanguageModeOptions {
  initialLanguageMode?: LanguageMode
}

interface LanguageModeContextType {
  languageMode: LanguageMode
  setLanguageMode: (value: LanguageMode) => void
}

export const LanguageModeContext = React.createContext(
  {} as LanguageModeContextType
)

if (__DEV__) {
  LanguageModeContext.displayName = 'LanguageModeContext'
}

/**
 * React hook that reads from `LanguageModeProvider` context
 * Returns the language mode and function to set it
 */
export function useLanguageMode() {
  const context = React.useContext(LanguageModeContext)
  if (context === undefined) {
    throw new Error(
      'useLangaugeMode must be used within a LanguageModeProvider'
    )
  }
  return context
}

export interface LanguageModeProviderProps {
  value?: LanguageMode
  children?: React.ReactNode
  options: LanguageModeOptions
  languageModeManager?: StorageManager
}

/**
 * Provides context for the language mode
 * Returns the color mode and function to toggle the color mode
 */
export function LanguageModeProvider(props: LanguageModeProviderProps) {
  const {
    value,
    children,
    options: {initialLanguageMode = 'en'},
    languageModeManager = localStorageManager
  } = props

  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */
  const [languageMode, rawSetLanguageMode] = React.useState<
    LanguageMode | undefined
  >(
    languageModeManager.type === 'cookie'
      ? languageModeManager.get(initialLanguageMode)
      : initialLanguageMode
  )

  React.useEffect(() => {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - previously stored value
     */
    if (isBrowser && languageModeManager.type === 'localStorage') {
      const mode = languageModeManager.get()

      if (mode) {
        rawSetLanguageMode(mode)
      }
    }
  }, [languageModeManager, initialLanguageMode])

  const setLanguageMode = React.useCallback(
    (value: LanguageMode) => {
      languageModeManager.set(value)
      rawSetLanguageMode(value)
    },
    [languageModeManager]
  )

  // presence of `value` indicates a controlled context
  const context = React.useMemo(
    () => ({
      languageMode: (value ?? languageMode) as LanguageMode,
      setLanguageMode: value ? noop : setLanguageMode
    }),
    [languageMode, setLanguageMode, value]
  )

  return (
    <LanguageModeContext.Provider value={context}>
      {children}
    </LanguageModeContext.Provider>
  )
}

if (__DEV__) {
  LanguageModeContext.displayName = 'LanguageModeContext'
}

/**
 * Get the current language from the translations value
 *
 * @param value the translations value
 *
 * @example
 *
 * ```js
 *
 * const translations = {
 *  "logout_button": {
 *    "en": "Logout",
 *    "de": "Abmelden"
 *   }
 * }
 *
 * const CONTENT = useLanguageModeValue(translations)
 * ```
 */
export function useLanguageModeValue<T extends Translations>(value: T) {
  const {languageMode} = useLanguageMode()

  const translation: Trs<T> = {} as Trs<T>

  for (const [key, element] of Object.entries(value)) {
    translation[key as keyof T] = element[languageMode]
  }

  return translation
}
