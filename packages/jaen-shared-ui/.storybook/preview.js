import {LanguageModeProvider} from '../src/language-mode'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  Story => (
    <LanguageModeProvider options={{initialLanguageMode: 'en'}}>
      <Story />
    </LanguageModeProvider>
  )
]
