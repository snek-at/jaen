export type LanguageMode = 'en' | 'de'
export type Translations = {[name: string]: {en: string; de: string}}
export type Trs<T> = {[name in keyof T]: string}
