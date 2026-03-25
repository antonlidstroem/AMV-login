import { createI18n } from 'vue-i18n'
import { translations } from './translations'
import type { BaseTranslations } from './types'


export const i18n = createI18n<{ message: BaseTranslations }, 'sv' | 'en'>({
  legacy: false,
  locale: 'sv',
  fallbackLocale: 'en',
  messages: translations as any 
})