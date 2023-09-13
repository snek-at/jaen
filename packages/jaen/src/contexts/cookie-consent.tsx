import {useColorMode} from '@chakra-ui/react'
import {createContext, useContext, useEffect, useRef} from 'react'
import 'vanilla-cookieconsent'

const buildPluginConfig = (settings?: {
  useGoogleAnalytics?: boolean
}): UserConfig => {
  const pluginConfig: UserConfig = {
    current_lang: 'en',
    autoclear_cookies: true,
    page_scripts: true,

    gui_options: {
      settings_modal: {
        layout: 'box'
      },
      consent_modal: {
        layout: 'cloud'
      }
    },

    languages: {
      en: {
        consent_modal: {
          title: 'We use cookies!',
          description:
            'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
          primary_btn: {
            text: 'Accept all',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Reject all',
            role: 'accept_necessary'
          }
        },
        settings_modal: {
          title: 'Cookie Settings',
          save_settings_btn: 'Save settings',
          accept_all_btn: 'Accept all',
          reject_all_btn: 'Reject all',
          close_btn_label: 'Close',
          cookie_table_headers: [
            {col1: 'Name'},
            {col2: 'Domain'},
            {col3: 'Expiration'},
            {col4: 'Description'}
          ],
          blocks: [
            {
              title: 'Cookie usage 📢',
              description:
                'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
            },
            {
              title: 'Strictly necessary cookies',
              description:
                'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true // cookie categories with readonly=true are all treated as "necessary cookies"
              }
            },
            {
              title: 'Performance and Analytics cookies',
              description:
                'These cookies allow the website to remember the choices you have made in the past',
              toggle: {
                value: 'analytics', // your cookie category
                enabled: false,
                readonly: false
              },
              cookie_table: [
                ...(settings?.useGoogleAnalytics
                  ? [
                      {
                        col1: '^_ga', // Google Analytics cookies
                        col2: 'google.com',
                        col3: '2 years',
                        col4: 'Used to distinguish users in Google Analytics. This cookie helps us understand how visitors interact with our website.',
                        is_regex: true
                      },
                      {
                        col1: '_gid',
                        col2: 'google.com',
                        col3: '1 day',
                        col4: 'Used to distinguish users in Google Analytics. This cookie helps us understand how visitors interact with our website.'
                      }
                    ]
                  : [])
              ]
            },
            {
              title: 'Advertisement and Targeting cookies',
              description:
                'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
              toggle: {
                value: 'targeting',
                enabled: false,
                readonly: false
              }
            },
            {
              title: 'More information',
              description:
                'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contakt">contact us</a>.'
            }
          ]
        }
      }
    }
  }

  return pluginConfig
}

const CookieContext = createContext<CookieConsent | undefined>(undefined)

export interface CookieConsentProviderProps {
  locale?: string
  useGoogleAnalytics?: boolean
  children: React.ReactNode
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({
  children,
  useGoogleAnalytics,
  locale
}) => {
  const cc = useRef<CookieConsent | undefined>(undefined)

  const {colorMode} = useColorMode()

  useEffect(() => {
    if (!document.getElementById('cc--main')) {
      cc.current = window.initCookieConsent()

      const pluginConfig = buildPluginConfig({
        useGoogleAnalytics
      })

      cc.current.run({
        ...pluginConfig,
        current_lang: locale
      })
    }
  }, [locale])

  useEffect(() => {
    if (cc.current) {
      const hasDarkMode = document.body.classList.contains('c_darkmode')

      if (colorMode === 'dark' && !hasDarkMode) {
        document.body.classList.add('c_darkmode')
      } else if (colorMode === 'light' && hasDarkMode) {
        document.body.classList.remove('c_darkmode')
      }
    }
  }, [colorMode, cc])

  return (
    <CookieContext.Provider value={cc.current}>
      {children}
    </CookieContext.Provider>
  )
}

export default CookieConsentProvider

export function useCookieConsentContext(): CookieConsent {
  const context = useContext(CookieContext)

  if (context === undefined) {
    // Return a mocked version of the context
    return {} as CookieConsent
  }
  return context
}
