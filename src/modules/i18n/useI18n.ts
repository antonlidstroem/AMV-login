import { reactive } from 'vue'
import { translations, languageNames } from './translations'

export type Lang = keyof typeof translations
export type TranslationKey = keyof typeof translations['sv']

const state = reactive<{ currentLang: Lang }>({ currentLang: 'sv' })

export function useI18n() {
  /**
   * Translate a key with optional variable interpolation.
   * Variables in translation strings are written as {name} and replaced by
   * the matching key in the `vars` map.
   *
   * Example:
   *   translation: 'Email sent to {email}.'
   *   t('resetEmailSentMessage', { email: 'me@example.com' })
   *   → 'Email sent to me@example.com.'
   */
  function t(key: TranslationKey, vars?: Record<string, string>): string {
    let raw = translations[state.currentLang]?.[key] ?? key
    if (vars) {
      raw = raw.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? `{${name}}`)
    }
    return raw
  }
  function changeLang(lang: Lang) { state.currentLang = lang }
  return { state, t, changeLang, languageNames }
}
