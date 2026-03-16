import { createI18n } from 'vue-i18n'
import { translations } from './translations'
import type { BaseTranslations } from './types'

// Vi definierar schemat för att vue-i18n ska förstå strukturen
export const i18n = createI18n<{ message: BaseTranslations }, 'sv' | 'en'>({
  legacy: false,
  locale: 'sv',
  fallbackLocale: 'en',
  messages: translations as any // 'as any' här är en säker genväg när interfacet ovan är definierat
})